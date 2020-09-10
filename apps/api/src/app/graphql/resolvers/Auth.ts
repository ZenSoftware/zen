import { HttpException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import bcrypt from 'bcryptjs';
import { CookieOptions } from 'express';
import gql from 'graphql-tag';

import { GqlGuard, GqlUser, RequestUser, Role } from '../../auth';
import { AuthService } from '../../auth/auth.service';
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
    authPasswordResetConfirmation(data: AuthPasswordResetConfirmationInput!): Boolean
    authRegister(data: AuthRegisterInput): User!
  }

  type AuthSession {
    id: Int!
    maxAge: String!
    roles: [String!]!
    rememberMe: Boolean!
  }

  input AuthLoginInput {
    email: String!
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
    email: String!
  }

  input AuthRegisterInput {
    email: String!
    firstName: String!
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

  private async getUser(email: string, ctx: IContext) {
    const users = await ctx.prisma.user.findMany({
      where: {
        email: {
          mode: 'insensitive',
          equals: email,
        },
      },
    });

    return users[0];
  }

  @Query()
  async authLogin(@Context() ctx: IContext, @Args('data') data: AuthLoginInput) {
    const user = await this.getUser(data.email, ctx);

    if (!user) throw new HttpException({ code: 'USER_NOT_FOUND' }, 400);

    const correctPassword = await bcrypt.compare(data.password, user.password);
    if (!correctPassword) throw new HttpException({ code: 'INCORRECT_PASSWORD' }, 400);

    return this.auth.setJwtCookie(ctx.res, user, data.rememberMe);
  }

  @Query()
  @UseGuards(GqlGuard)
  async authExchangeToken(@Context() ctx: IContext, @GqlUser() reqUser: RequestUser) {
    const user = await ctx.prisma.user.findOne({
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
    const user = await this.getUser(data.email, ctx);

    if (!user) throw new HttpException({ code: 'USER_NOT_FOUND' }, 400);

    this.mail.sendPasswordReset(user.email);
  }

  @Mutation()
  async authRegister(@Context() ctx: IContext, @Args('data') data: AuthRegisterInput) {
    const userFound = await this.getUser(data.email, ctx);
    if (userFound) throw new HttpException({ code: 'EMAIL_TAKEN' }, 400);

    const hashedPassword = await bcrypt.hash(data.password, 12);

    return await ctx.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email.trim(),
        password: hashedPassword,
        roles: { set: [Role.Registered] },
      },
    });
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

    const user = await this.getUser(tokenPayload.email, ctx);

    if (!user) throw new HttpException({ code: 'USER_NOT_FOUND' }, 400);

    const hashedPassword = await bcrypt.hash(data.newPassword, 12);

    await ctx.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
  }

  @Mutation()
  @UseGuards(GqlGuard)
  async authPasswordChange(
    @Context() ctx: IContext,
    @Args('data') data: AuthPasswordChangeInput,
    @GqlUser() reqUser: RequestUser
  ) {
    const user = await ctx.prisma.user.findOne({ where: { id: reqUser.id } });
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
