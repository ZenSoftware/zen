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
import { PrismaClient, PrismaService } from '../../prisma';
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
@Throttle()
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
    const user = await this.getUserByUsername(args.username, this.prisma);

    if (!user) throw new HttpException(ApiError.AuthLogin.USER_NOT_FOUND, 401);

    const correctPassword = await bcryptVerify({
      password: args.password,
      hash: user.password as string,
    });
    if (!correctPassword) throw new HttpException(ApiError.AuthLogin.INCORRECT_PASSWORD, 400);

    return this.auth.getAuthSession(user, args.rememberMe);
  }

  @Query()
  @UseGuards(RolesGuard())
  async accountInfo(@CurrentUser() reqUser: RequestUser): Promise<AccountInfo> {
    const user = await this.prisma.user.findUnique({
      where: { id: reqUser.id },
    });

    if (!user) throw new UnauthorizedException('User not found');

    return {
      username: user.username,
      hasPassword: !!user.password,
      googleProfile: user.googleProfile as AccountInfo['googleProfile'],
    };
  }

  @Query()
  @UseGuards(RolesGuard())
  async authExchangeToken(
    @CurrentUser() reqUser: RequestUser,
    @Args('data') args: AuthExchangeTokenInput
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: reqUser.id },
    });

    if (user) {
      return this.auth.getAuthSession(user, args.rememberMe);
    } else {
      throw new HttpException(ApiError.AuthExchangeToken.USER_NOT_FOUND, 401);
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
    });

    if (possibleUsers.length === 0)
      throw new HttpException(ApiError.AuthPasswordResetRequest.USER_NOT_FOUND, 401);

    possibleUsers.forEach(user => this.mail.sendPasswordReset(user));
  }

  @Mutation()
  async authPasswordResetConfirmation(@Args('data') args: AuthPasswordResetConfirmationInput) {
    let tokenPayload: JwtPayload;
    try {
      tokenPayload = this.jwtService.verify(args.token);
    } catch {
      throw new UnauthorizedException('JWT failed verification');
    }

    let user = await this.prisma.user.findUnique({ where: { id: tokenPayload.sub } });

    if (!user) throw new HttpException(ApiError.AuthPasswordResetConfirmation.USER_NOT_FOUND, 401);

    const hashedPassword = await this.hashPassword(args.newPassword);

    user = await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return this.auth.getAuthSession(user);
  }

  @Mutation()
  async authRegister(@Args('data') args: AuthRegisterInput) {
    if (!this.config.publicRegistration)
      throw new HttpException(ApiError.AuthRegister.NO_PUBLIC_REGISTRATIONS, 401);

    if (await this.getUserByUsername(args.username, this.prisma))
      throw new HttpException(ApiError.AuthRegister.USERNAME_TAKEN, 400);

    if (await this.getUserByEmail(args.email, this.prisma))
      throw new HttpException(ApiError.AuthRegister.EMAIL_TAKEN, 400);

    const hashedPassword = await this.hashPassword(args.password);

    const user = await this.prisma.user.create({
      data: {
        username: args.username,
        email: args.email,
        password: hashedPassword,
      },
    });

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

    Logger.log(`Registered new user: ${user.username}`);

    return this.auth.getAuthSession(user);
  }

  @Mutation()
  @UseGuards(RolesGuard())
  async authPasswordChange(
    @Args('data') args: AuthPasswordChangeInput,
    @CurrentUser() reqUser: RequestUser
  ) {
    const user = await this.prisma.user.findUnique({ where: { id: reqUser.id } });
    if (!user) throw new HttpException(ApiError.AuthPasswordChange.USER_NOT_FOUND, 401);

    const correctPassword = await bcryptVerify({
      password: args.oldPassword,
      hash: user.password as string,
    });
    if (!correctPassword) throw new HttpException(ApiError.AuthPasswordChange.WRONG_PASSWORD, 400);

    const hashedPassword = await this.hashPassword(args.newPassword);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
  }

  private async getUserByUsername(username: string, prisma: PrismaClient) {
    return prisma.user.findFirst({
      where: {
        username: {
          mode: 'insensitive',
          equals: username,
        },
      },
    });
  }

  private async getUserByEmail(email: string, prisma: PrismaClient) {
    return prisma.user.findFirst({
      where: {
        email: {
          mode: 'insensitive',
          equals: email,
        },
      },
    });
  }

  private async hashPassword(password: string) {
    return bcrypt({
      costFactor: this.config.bcryptCost,
      password,
      salt: crypto.getRandomValues(new Uint8Array(16)),
    });
  }
}
