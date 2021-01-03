import { HttpException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { CookieOptions } from 'express';
import gql from 'graphql-tag';
import { Throttle, ThrottlerGuard } from 'nestjs-throttler';

import { AuthService, GqlGuard, GqlUser, RequestUser, Role } from '../../auth';
import { ConfigService } from '../../config';
import { JwtService } from '../../jwt';
import { MailService } from '../../mail';
import {
  AuthLoginInput,
  AuthPasswordChangeInput,
  AuthPasswordResetConfirmationInput,
  AuthPasswordResetRequestInput,
  AuthRegisterInput,
  IContext,
} from '../models';

export const AuthTypeDef = gql`
  extend type Query {
    authLogin(data: AuthLoginInput!): AuthSession!
    authExchangeToken: AuthSession!
    authPasswordResetRequest(data: AuthPasswordResetRequestInput!): Boolean
  }

  extend type Mutation {
    authPasswordChange(data: AuthPasswordChangeInput!): Boolean
    authPasswordResetConfirmation(data: AuthPasswordResetConfirmationInput!): AuthSession!
    authRegister(data: AuthRegisterInput!): AuthSession!
  }

  type AuthSession {
    id: Int!
    maxAge: String!
    roles: [String!]!
    rememberMe: Boolean!
  }

  input AuthLoginInput {
    username: String!
    password: String!
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

@Resolver('Auth')
export class AuthResolver {
  private CLEAR_COOKIE_OPTIONS: CookieOptions = {
    maxAge: 0,
    secure: this.config.production,
    sameSite: this.config.production ? 'strict' : 'lax',
  };

  constructor(
    private readonly auth: AuthService,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mail: MailService
  ) {}

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

  @Query()
  @UseGuards(ThrottlerGuard)
  @Throttle(5, 60)
  async authLogin(@Context() ctx: IContext, @Args('data') data: AuthLoginInput) {
    const user = await this.getUserByUsername(data.username, ctx.prisma);

    if (!user) throw new HttpException({ code: 'USER_NOT_FOUND' }, 400);

    const correctPassword = await bcrypt.compare(data.password, user.password);
    if (!correctPassword) throw new HttpException({ code: 'INCORRECT_PASSWORD' }, 400);

    return this.auth.setJwtCookie(ctx.res, user, data.rememberMe);
  }

  @Query()
  @UseGuards(GqlGuard)
  async authExchangeToken(@Context() ctx: IContext, @GqlUser() reqUser: RequestUser) {
    const user = await ctx.prisma.user.findUnique({
      where: { id: reqUser.id },
    });

    if (user) {
      return this.auth.setJwtCookie(ctx.res, user, ctx.req.cookies['rememberMe']);
    } else {
      ctx.res.clearCookie('jwt', this.CLEAR_COOKIE_OPTIONS);
      ctx.res.clearCookie('rememberMe', this.CLEAR_COOKIE_OPTIONS);
      throw new HttpException({ code: 'USER_NOT_FOUND' }, 400);
    }
  }

  @Query()
  async authPasswordResetRequest(
    @Context() ctx: IContext,
    @Args('data') data: AuthPasswordResetRequestInput
  ) {
    const possibleUsers = await ctx.prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              equals: data.emailOrUsername,
              mode: 'insensitive',
            },
          },
          {
            username: {
              equals: data.emailOrUsername,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    if (possibleUsers.length <= 0)
      throw new HttpException({ code: 'USER_NOT_FOUND' }, 400);

    possibleUsers.forEach(u => this.mail.sendPasswordReset(u));
  }

  @Mutation()
  async authPasswordResetConfirmation(
    @Context() ctx: IContext,
    @Args('data') data: AuthPasswordResetConfirmationInput
  ) {
    let tokenPayload;
    try {
      tokenPayload = this.jwtService.verify(data.token);
    } catch {
      throw new HttpException({ code: 'UNAUTHORIZED' }, 400);
    }

    let user = await this.getUserByUsername(tokenPayload.username, ctx.prisma);

    if (!user) throw new HttpException({ code: 'USER_NOT_FOUND' }, 400);

    const hashedPassword = await bcrypt.hash(data.newPassword, 12);

    user = await ctx.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return this.auth.setJwtCookie(ctx.res, user);
  }

  @Mutation()
  async authRegister(@Context() ctx: IContext, @Args('data') data: AuthRegisterInput) {
    const userFoundByUsername = await this.getUserByUsername(data.username, ctx.prisma);
    if (userFoundByUsername) throw new HttpException({ code: 'USERNAME_TAKEN' }, 400);

    const userFoundByEmail = await this.getUserByEmail(data.email, ctx.prisma);
    if (userFoundByEmail) throw new HttpException({ code: 'EMAIL_TAKEN' }, 400);

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await ctx.prisma.user.create({
      data: {
        username: data.username.trim(),
        email: data.email.trim(),
        password: hashedPassword,
        roles: { set: [Role.Registered] },
      },
    });

    if (this.config.production) {
      this.mail.sendWelcome({
        to: user.email,
        context: {
          siteUrl: this.config.siteUrl,
          hiddenPreheaderText: `Sign up confirmed for ${user.username}`,
          header: 'Welcome',
          subject: 'Sign Up Confirmed',
          body: `Thanks you for signing up ${user.username}!`,
          footerHeader: '',
          footerBody: '',
        },
      });
    }

    return this.auth.setJwtCookie(ctx.res, user);
  }

  @Mutation()
  @UseGuards(GqlGuard)
  async authPasswordChange(
    @Context() ctx: IContext,
    @Args('data') data: AuthPasswordChangeInput,
    @GqlUser() reqUser: RequestUser
  ) {
    const user = await ctx.prisma.user.findUnique({ where: { id: reqUser.id } });
    if (!user) throw new HttpException({ code: 'USER_NOT_FOUND' }, 400);

    const correctPassword = await bcrypt.compare(data.oldPassword, user.password);
    if (!correctPassword) throw new HttpException({ code: 'WRONG_PASSWORD' }, 400);

    const hashedPassword = await bcrypt.hash(data.newPassword, 12);

    await ctx.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
  }
}
