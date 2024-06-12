import crypto from 'crypto';

import { HttpException, Logger, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Throttle } from '@nestjs/throttler';
import { ApiError } from '@zen/common';
import { CurrentUser, JwtPayload, RequestUser, RolesGuard } from '@zen/nest-auth';
import gql from 'graphql-tag';
import { bcrypt, bcryptVerify } from 'hash-wasm';

import { AuthService } from '../../auth';
import { ConfigService } from '../../config';
import { JwtService } from '../../jwt';
import { MailService } from '../../mail';
import { PrismaService } from '../../prisma';
import { GqlThrottlerGuard } from '../gql-throttler.guard';
import {
  AccountInfo,
  AuthExchangeTokenInput,
  AuthLoginInput,
  AuthPasswordChangeInput,
  AuthPasswordResetConfirmationInput,
  AuthPasswordResetRequestInput,
  AuthRegisterInput,
} from '../models';

const logger = new Logger('AuthResolver');

export const typeDefs = gql`
  extend type Query {
    authLogin(data: AuthLoginInput!): AuthSession!
    authExchangeToken(data: AuthExchangeTokenInput): AuthSession!
    authPasswordResetRequest(data: AuthPasswordResetRequestInput!): Boolean
    accountInfo: AccountInfo!
  }

  extend type Mutation {
    authPasswordChange(data: AuthPasswordChangeInput!): Boolean
    authPasswordResetConfirmation(data: AuthPasswordResetConfirmationInput!): AuthSession!
    authRegister(data: AuthRegisterInput!): AuthSession!
  }

  type AuthSession {
    userId: String! # Change to Int! or String! respective to the typeof User['id']
    token: String!
    roles: [String!]!
    rememberMe: Boolean!
    expiresIn: Int!
    rules: [Json!]!
  }

  type GoogleProfile {
    name: String
    given_name: String
    family_name: String
    locale: String
    email: String
    picture: String
  }

  type AccountInfo {
    username: String
    hasPassword: Boolean!
    googleProfile: GoogleProfile
  }

  input AuthLoginInput {
    username: String!
    password: String!
    rememberMe: Boolean!
  }

  input AuthExchangeTokenInput {
    rememberMe: Boolean!
  }

  input AuthPasswordChangeInput {
    oldPassword: String!
    newPassword: String!
  }

  input AuthPasswordResetConfirmationInput {
    newPassword: String!
    token: String!
  }

  input AuthPasswordResetRequestInput {
    emailOrUsername: String!
  }

  input AuthRegisterInput {
    username: String!
    email: String!
    password: String!
  }
`;

@Resolver()
@UseGuards(GqlThrottlerGuard)
@Throttle({ default: { limit: 10, ttl: 30_000 } })
export class AuthResolver {
  constructor(
    private readonly auth: AuthService,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mail: MailService,
    private readonly prisma: PrismaService
  ) {}

  @Query()
  async authLogin(@Args('data') args: AuthLoginInput) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: {
          mode: 'insensitive',
          equals: args.username,
        },
      },
      select: {
        id: true,
        roles: true,
        password: true,
      },
    });

    if (!user) throw new HttpException(ApiError.Codes.USER_NOT_FOUND, 400);

    const correctPassword = await bcryptVerify({
      password: args.password,
      hash: user.password as string,
    });
    if (!correctPassword) throw new HttpException(ApiError.AuthLogin.INCORRECT_PASSWORD, 400);

    return this.auth.getAuthSession(user, args.rememberMe);
  }

  @Query()
  @UseGuards(RolesGuard())
  async accountInfo(@CurrentUser() reqUser: RequestUser) {
    const user = await this.prisma.user.findUnique({
      where: { id: reqUser.id },
      select: { username: true, password: true, googleProfile: true },
    });

    if (!user) throw new UnauthorizedException(ApiError.Codes.USER_NOT_FOUND);

    return {
      username: user.username,
      hasPassword: !!user.password,
      googleProfile: user.googleProfile as AccountInfo['googleProfile'],
    } satisfies AccountInfo;
  }

  @Query()
  @UseGuards(RolesGuard())
  async authExchangeToken(
    @CurrentUser() reqUser: RequestUser,
    @Args('data') args: AuthExchangeTokenInput
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: reqUser.id },
      select: { id: true, roles: true },
    });

    if (user) {
      return this.auth.getAuthSession(user, args.rememberMe);
    } else {
      throw new UnauthorizedException(ApiError.Codes.USER_NOT_FOUND);
    }
  }

  @Query()
  async authPasswordResetRequest(@Args('data') args: AuthPasswordResetRequestInput) {
    const possibleUsers = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              equals: args.emailOrUsername,
              mode: 'insensitive',
            },
          },
          {
            username: {
              equals: args.emailOrUsername,
              mode: 'insensitive',
            },
          },
        ],
        AND: [{ username: { not: null } }],
      },
      select: { id: true, email: true },
    });

    if (possibleUsers.length === 0) throw new HttpException(ApiError.Codes.USER_NOT_FOUND, 400);

    possibleUsers.forEach(user => this.mail.sendPasswordReset(user));
  }

  @Mutation()
  async authPasswordResetConfirmation(@Args('data') args: AuthPasswordResetConfirmationInput) {
    let tokenPayload: JwtPayload;
    try {
      tokenPayload = this.jwtService.verify(args.token);
    } catch {
      throw new UnauthorizedException(ApiError.AuthPasswordResetConfirmation.JWT_FAILED);
    }

    const userExists = await this.prisma.user.findUnique({
      where: { id: tokenPayload.sub },
      select: { id: true },
    });
    if (!userExists) throw new UnauthorizedException(ApiError.Codes.USER_NOT_FOUND);

    const hashedPassword = await this.hashPassword(args.newPassword);

    const updatedUser = await this.prisma.user.update({
      where: { id: tokenPayload.sub },
      select: { id: true, roles: true },
      data: { password: hashedPassword },
    });

    return this.auth.getAuthSession(updatedUser);
  }

  @Mutation()
  async authRegister(@Args('data') args: AuthRegisterInput) {
    if (!this.config.publicRegistration)
      throw new UnauthorizedException('No public registrations allowed');

    const usernameTaken = await this.prisma.user.findFirst({
      where: { username: { equals: args.username, mode: 'insensitive' } },
      select: { username: true },
    });
    if (usernameTaken) throw new HttpException(ApiError.AuthRegister.USERNAME_TAKEN, 400);

    const emailTaken = await this.prisma.user.findFirst({
      where: { email: { equals: args.email, mode: 'insensitive' } },
      select: { email: true },
    });
    if (emailTaken) throw new HttpException(ApiError.AuthRegister.EMAIL_TAKEN, 400);

    const hashedPassword = await this.hashPassword(args.password);

    const user = await this.prisma.user.create({
      data: {
        username: args.username,
        email: args.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        roles: true,
        username: true,
        email: true,
      },
    });

    /**
     * @todo This is intended to be tailored to the site
     */
    if (this.config.production) {
      this.mail.sendGeneral({
        to: user.email,
        subject: 'Sign Up Confirmed',
        context: {
          siteUrl: this.config.siteUrl,
          hiddenPreheaderText: `Sign up confirmed for ${user.username}`,
          header: 'Welcome',
          subHeading: 'Sign Up Confirmed',
          body: `Thank you for signing up ${user.username}!`,
          footerHeader: '',
          footerBody: '',
        },
      });
    }

    logger.log(`Registered new user: ${user.username}`);

    return this.auth.getAuthSession(user);
  }

  @Mutation()
  @UseGuards(RolesGuard())
  async authPasswordChange(
    @Args('data') args: AuthPasswordChangeInput,
    @CurrentUser() reqUser: RequestUser
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: reqUser.id },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) throw new UnauthorizedException(ApiError.Codes.USER_NOT_FOUND);

    const correctPassword = await bcryptVerify({
      password: args.oldPassword,
      hash: user.password as string,
    });
    if (!correctPassword) throw new HttpException(ApiError.AuthPasswordChange.WRONG_PASSWORD, 400);

    const hashedPassword = await this.hashPassword(args.newPassword);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
      select: { id: true },
    });
  }

  private async hashPassword(password: string) {
    return bcrypt({
      // @default 12 bytes
      costFactor: this.config.bcrypt?.costFactor ? this.config.bcrypt.costFactor : 12,
      password,
      salt: crypto.getRandomValues(
        // @default 16 bytes
        new Uint8Array(this.config.bcrypt?.saltSize ? this.config.bcrypt.saltSize : 16)
      ),
    });
  }
}
