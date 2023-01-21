import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CaslGuard, CaslAbility } from '@zen/nest-auth';
import { gql } from 'graphql-tag';

import { User, PrismaService } from '../../prisma';
import { AppAbility, AuthService } from '../../auth';
import type {
  AggregateUserArgs,
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
import { subject } from '@casl/ability';

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
  async findUniqueUser(@CaslAbility() ability: AppAbility, @Args() args: FindUniqueUserArgs) {
    const item = await this.prisma.user.findUnique({ where: args.where });
    if (ability.cannot('read', subject('User', item))) throw new ForbiddenException();
    return item;
  }

  @Query()
  async findFirstUser(@CaslAbility() ability: AppAbility, @Args() args: FindFirstUserArgs) {
    const item = await this.prisma.user.findFirst({ where: args.where });
    if (ability.cannot('read', subject('User', item))) throw new ForbiddenException();
    return item;
  }

  @Query()
  async findManyUser(@CaslAbility() ability: AppAbility, @Args() args: FindManyUserArgs) {
    const items = await this.prisma.user.findMany({ where: args.where });
    for (const item of items) {
      if (ability.cannot('read', subject('User', item))) throw new ForbiddenException();
    }
    return items;
  }

  @Query()
  async findManyUserCount(@CaslAbility() ability: AppAbility, @Args() args: FindManyUserArgs) {
    if (ability.cannot('read', 'User')) throw new ForbiddenException();
    return this.prisma.user.count({ where: args.where });
  }

  @Query()
  async aggregateUser(@CaslAbility() ability: AppAbility, @Args() args: AggregateUserArgs) {
    if (ability.cannot('read', 'User')) throw new ForbiddenException();
    return this.prisma.user.aggregate({ where: args.where });
  }

  @Mutation()
  async createOneUser(@CaslAbility() ability: AppAbility, @Args() args: CreateOneUserArgs) {
    if (ability.cannot('create', subject('User', args.data as any))) throw new ForbiddenException();
    return this.prisma.user.create({ data: args.data });
  }

  @Mutation()
  async updateOneUser(@CaslAbility() ability: AppAbility, @Args() args: UpdateOneUserArgs) {
    const item = await this.prisma.user.findUnique({ where: args.where });
    if (ability.cannot('update', subject('User', item))) throw new ForbiddenException();
    return this.prisma.user.update({ where: args.where, data: args.data });
  }

  @Mutation()
  async updateManyUser(@CaslAbility() ability: AppAbility, @Args() args: UpdateManyUserArgs) {
    const items = await this.prisma.user.findMany({ where: args.where });
    for (const item of items) {
      if (ability.cannot('update', subject('User', item))) throw new ForbiddenException();
    }
    return this.prisma.user.updateMany({ where: args.where, data: args.data });
  }

  @Mutation()
  async upsertOneUser(@CaslAbility() ability: AppAbility, @Args() args: UpsertOneUserArgs) {
    if (
      ability.cannot('create', subject('User', args.create as any)) ||
      ability.cannot('update', subject('User', args.update as any))
    ) {
      throw new ForbiddenException();
    }
    return this.prisma.user.upsert({ where: args.where, create: args.create, update: args.update });
  }

  @Mutation()
  async deleteOneUser(@CaslAbility() ability: AppAbility, @Args() args: DeleteOneUserArgs) {
    const item = await this.prisma.user.findUnique({ where: args.where });
    if (ability.cannot('delete', subject('User', item))) throw new ForbiddenException();
    return this.prisma.user.delete({ where: args.where });
  }

  @Mutation()
  async deleteManyUser(@CaslAbility() ability: AppAbility, @Args() args: DeleteManyUserArgs) {
    const items = await this.prisma.user.findMany({ where: args.where });
    for (const item of items) {
      if (ability.cannot('delete', subject('User', item))) throw new ForbiddenException();
    }
    return this.prisma.user.deleteMany({ where: args.where });
  }
}
