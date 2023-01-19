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
import { CASL_FACTORY_TOKEN, CaslSubject, CaslGuard } from '@zen/nest-auth';
import type { ICaslFactory } from '@zen/nest-auth';
import { GraphQLResolveInfo } from 'graphql';
import { gql } from 'graphql-tag';

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
  constructor(@Inject(CASL_FACTORY_TOKEN) private readonly caslFactory: ICaslFactory) {}

  @ResolveField()
  async password() {
    return null;
  }

  @ResolveField()
  async rules(@Parent() parent: User) {
    const ability = await this.caslFactory.createAbility(parent);
    return ability.rules;
  }

  @Query()
  @UseGuards(CaslGuard('read'))
  async findUniqueUser(
    @Args() args: FindUniqueUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.findUniqueUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(CaslGuard('read'))
  async findFirstUser(
    @Args() args: FindFirstUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.findFirstUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(CaslGuard('read'))
  async findManyUser(
    @Args() args: FindManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.findManyUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(CaslGuard('read'))
  async findManyUserCount(
    @Args() args: FindManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.findManyUserCount(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(CaslGuard('read'))
  async aggregateUser(
    @Args() args: AggregateUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.aggregateUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(CaslGuard('create'))
  async createOneUser(
    @Args() args: CreateOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.createOneUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(CaslGuard('update'))
  async updateOneUser(
    @Args() args: UpdateOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.updateOneUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(CaslGuard('update'))
  async updateManyUser(
    @Args() args: UpdateManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.updateManyUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(CaslGuard('create', 'update'))
  async upsertOneUser(
    @Args() args: UpsertOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.upsertOneUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(CaslGuard('delete'))
  async deleteOneUser(
    @Args() args: DeleteOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.deleteOneUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(CaslGuard('delete'))
  async deleteManyUser(
    @Args() args: DeleteManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.deleteManyUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }
}
