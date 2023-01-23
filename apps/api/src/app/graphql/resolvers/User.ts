import { subject } from '@casl/ability';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CaslAbility, CaslGuard } from '@zen/nest-auth';
import { GraphQLResolveInfo } from 'graphql';
import { gql } from 'graphql-tag';

import { AuthService, defaultFields } from '../../auth';
import type { AppAbility } from '../../auth';
import { PrismaSelectArgs, PrismaService, User } from '../../prisma';
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
    const record = await this.prisma.user.findUnique(PrismaSelectArgs(info, args, defaultFields));
    if (ability.cannot('read', subject('User', record))) throw new ForbiddenException();
    return record;
  }

  @Query()
  async findFirstUser(
    @Args() args: FindFirstUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.user.findFirst(PrismaSelectArgs(info, args, defaultFields));
    if (ability.cannot('read', subject('User', record))) throw new ForbiddenException();
    return record;
  }

  @Query()
  async findManyUser(
    @Args() args: FindManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const records = await this.prisma.user.findMany(PrismaSelectArgs(info, args, defaultFields));
    for (const record of records) {
      if (ability.cannot('read', subject('User', record))) throw new ForbiddenException();
    }
    return records;
  }

  @Query()
  async findManyUserCount(
    @Args() args: FindManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    if (ability.cannot('read', 'User')) throw new ForbiddenException();
    return this.prisma.user.count(PrismaSelectArgs(info, args));
  }

  @Query()
  async aggregateUser(
    @Args() args: AggregateUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    if (ability.cannot('read', 'User')) throw new ForbiddenException();
    return this.prisma.user.aggregate(PrismaSelectArgs(info, args));
  }

  @Mutation()
  async createOneUser(
    @Args() args: CreateOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    if (ability.cannot('create', subject('User', args.data as any))) throw new ForbiddenException();
    return this.prisma.user.create(PrismaSelectArgs(info, args));
  }

  @Mutation()
  async updateOneUser(
    @Args() args: UpdateOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.user.findUnique({
      where: args.where,
      select: defaultFields['User'],
    });
    if (ability.cannot('update', subject('User', record) as any)) throw new ForbiddenException();
    return this.prisma.user.update(PrismaSelectArgs(info, args));
  }

  @Mutation()
  async updateManyUser(
    @Args() args: UpdateManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const records = await this.prisma.user.findMany({
      where: args.where,
      select: defaultFields['User'],
    });
    for (const record of records) {
      if (ability.cannot('update', subject('User', record) as any)) throw new ForbiddenException();
    }
    return this.prisma.user.updateMany(PrismaSelectArgs(info, args));
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
    return this.prisma.user.upsert(PrismaSelectArgs(info, args));
  }

  @Mutation()
  async deleteOneUser(
    @Args() args: DeleteOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.user.findUnique({
      where: args.where,
      select: defaultFields['User'],
    });
    if (ability.cannot('delete', subject('User', record) as any)) throw new ForbiddenException();
    return this.prisma.user.delete(PrismaSelectArgs(info, args));
  }

  @Mutation()
  async deleteManyUser(
    @Args() args: DeleteManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const records = await this.prisma.user.findMany({
      where: args.where,
      select: defaultFields['User'],
    });
    for (const record of records) {
      if (ability.cannot('delete', subject('User', record) as any)) throw new ForbiddenException();
    }
    return this.prisma.user.deleteMany(PrismaSelectArgs(info, args));
  }
}
