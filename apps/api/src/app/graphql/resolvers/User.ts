import { subject } from '@casl/ability';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CaslAbility, CaslGuard } from '@zen/nest-auth';
import { GraphQLResolveInfo } from 'graphql';
import { gql } from 'graphql-tag';

import { AppAbility, AuthService } from '../../auth';
import { PrismaSelect, PrismaService, User } from '../../prisma';
import type {
  AggregateUserArgs,
  CreateManyUserArgs,
  CreateOneUserArgs,
  DeleteManyUserArgs,
  DeleteOneUserArgs,
  FindFirstUserArgs,
  FindManyUserArgs,
  FindUniqueUserArgs,
  UpdateManyUserArgs,
  UpdateOneUserArgs,
  UpsertOneUserArgs,
} from '../resolversTypes';

export const typeDefs = gql`
  extend type User {
    rules: [Json!]!
  }
`;

@Resolver('User')
@UseGuards(CaslGuard)
export class UserResolver {
  constructor(private readonly auth: AuthService, private readonly prisma: PrismaService) {}

  @ResolveField()
  async password() {
    return null;
  }

  @ResolveField()
  async rules(@Parent() parent: User) {
    const ability = await this.auth.createAbility(parent);
    return ability.rules;
  }

  @Query()
  async findUniqueUser(
    @Args() args: FindUniqueUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const item = await this.prisma.user.findUnique({ where: args.where });
    if (ability.cannot('read', subject('User', item))) throw new ForbiddenException();
    return this.prisma.user.findUnique({ where: args.where, select: PrismaSelect(info, args) });
  }

  @Query()
  async findFirstUser(
    @Args() args: FindFirstUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const item = await this.prisma.user.findFirst({ where: args.where });
    if (ability.cannot('read', subject('User', item))) throw new ForbiddenException();
    return this.prisma.user.findFirst({ where: args.where, select: PrismaSelect(info, args) });
  }

  @Query()
  async findManyUser(
    @Args() args: FindManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const items = await this.prisma.user.findMany({ where: args.where });
    for (const item of items) {
      if (ability.cannot('read', subject('User', item))) throw new ForbiddenException();
    }
    return this.prisma.user.findMany({ where: args.where, select: PrismaSelect(info, args) });
  }

  @Query()
  async findManyUserCount(@Args() args: FindManyUserArgs, @CaslAbility() ability: AppAbility) {
    if (ability.cannot('read', 'User')) throw new ForbiddenException();
    return this.prisma.user.count({ where: args.where });
  }

  @Query()
  async aggregateUser(@Args() args: AggregateUserArgs, @CaslAbility() ability: AppAbility) {
    if (ability.cannot('read', 'User')) throw new ForbiddenException();
    return this.prisma.user.aggregate({ where: args.where });
  }

  @Mutation()
  async createOneUser(
    @Args() args: CreateOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    if (ability.cannot('create', subject('User', args.data as any))) throw new ForbiddenException();
    return this.prisma.user.create({ data: args.data, select: PrismaSelect(info, args) });
  }

  @Mutation()
  async createManyUser(@Args() args: CreateManyUserArgs, @CaslAbility() ability: AppAbility) {
    for (const item of args.data) {
      if (ability.cannot('create', subject('User', item as any))) throw new ForbiddenException();
    }
    return this.prisma.user.createMany({ data: args.data });
  }

  @Mutation()
  async updateOneUser(
    @Args() args: UpdateOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const item = await this.prisma.user.findUnique({ where: args.where });
    if (ability.cannot('update', subject('User', item))) throw new ForbiddenException();
    return this.prisma.user.update({
      where: args.where,
      data: args.data,
      select: PrismaSelect(info, args),
    });
  }

  @Mutation()
  async updateManyUser(@Args() args: UpdateManyUserArgs, @CaslAbility() ability: AppAbility) {
    const items = await this.prisma.user.findMany({ where: args.where });
    for (const item of items) {
      if (ability.cannot('update', subject('User', item))) throw new ForbiddenException();
    }
    return this.prisma.user.updateMany({ where: args.where, data: args.data });
  }

  @Mutation()
  async upsertOneUser(
    @Args() args: UpsertOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    if (
      ability.cannot('create', subject('User', args.create as any)) ||
      ability.cannot('update', subject('User', args.update as any))
    ) {
      throw new ForbiddenException();
    }
    return this.prisma.user.upsert({
      where: args.where,
      create: args.create,
      update: args.update,
      select: PrismaSelect(info, args),
    });
  }

  @Mutation()
  async deleteOneUser(
    @Args() args: DeleteOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const item = await this.prisma.user.findUnique({ where: args.where });
    if (ability.cannot('delete', subject('User', item))) throw new ForbiddenException();
    return this.prisma.user.delete({ where: args.where, select: PrismaSelect(info, args) });
  }

  @Mutation()
  async deleteManyUser(@Args() args: DeleteManyUserArgs, @CaslAbility() ability: AppAbility) {
    const items = await this.prisma.user.findMany({ where: args.where });
    for (const item of items) {
      if (ability.cannot('delete', subject('User', item))) throw new ForbiddenException();
    }
    return this.prisma.user.deleteMany({ where: args.where });
  }
}
