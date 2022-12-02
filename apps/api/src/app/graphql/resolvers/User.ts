import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Info,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CASL_FACTORY_TOKEN, CaslSubject, GqlCaslGuard } from '@zen/nest-auth';
import { GraphQLResolveInfo } from 'graphql';
import { gql } from 'graphql-tag';

import { CaslAbilityFactory } from '../../auth';
import { User } from '../../prisma';
import { PrismaSelectArgs } from '../../prisma';
import { IContext } from '../models';
import resolvers from '../paljs/User/resolvers';
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
@CaslSubject('User')
export class UserResolver {
  constructor(
    @Inject(CASL_FACTORY_TOKEN) private readonly caslAbilityFactory: CaslAbilityFactory
  ) {}

  @ResolveField()
  async password() {
    return null;
  }

  @ResolveField()
  async rules(@Parent() parent: User) {
    const ability = await this.caslAbilityFactory.createAbility(parent);
    return ability.rules;
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findUniqueUser(
    @Args() args: FindUniqueUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.findUniqueUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findFirstUser(
    @Args() args: FindFirstUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.findFirstUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findManyUser(
    @Args() args: FindManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.findManyUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findManyUserCount(
    @Args() args: FindManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.findManyUserCount(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async aggregateUser(
    @Args() args: AggregateUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.aggregateUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('create'))
  async createOneUser(
    @Args() args: CreateOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.createOneUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('update'))
  async updateOneUser(
    @Args() args: UpdateOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.updateOneUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('update'))
  async updateManyUser(
    @Args() args: UpdateManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.updateManyUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('create', 'update'))
  async upsertOneUser(
    @Args() args: UpsertOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.upsertOneUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('delete'))
  async deleteOneUser(
    @Args() args: DeleteOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.deleteOneUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('delete'))
  async deleteManyUser(
    @Args() args: DeleteManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.deleteManyUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }
}
