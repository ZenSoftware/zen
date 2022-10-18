import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Info,
  Mutation,
  Parent,
  Query,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';

import { CaslSubject, GqlCaslGuard } from '../../auth';
import { PrismaSelectArgs } from '../../prisma';
import { IContext } from '../models';
import resolvers from '../paljs/User/resolvers';
import type {
  Product_AggregateUserArgs,
  Product_CreateOneUserArgs,
  Product_DeleteManyUserArgs,
  Product_DeleteOneUserArgs,
  Product_FindFirstUserArgs,
  Product_FindManyUserArgs,
  Product_FindUniqueUserArgs,
  Product_UpdateManyUserArgs,
  Product_UpdateOneUserArgs,
  Product_UpsertOneUserArgs,
} from '../resolversTypes';

export const typeDefs = null;
// export const typeDefs = gql`
//   extend type Query {
//     sampleUserQuery: User
//   }
//   extend type Mutation {
//     sampleUserMutation(args: Int!): Boolean
//   }
//   extend type User {
//     sampleUserField: String
//   }
// `;

@Resolver('User')
@CaslSubject('User')
export class UserResolver {
  @ResolveReference()
  resolveReference(@Parent() reference, @Context() ctx: IContext) {
    return resolvers.User.__resolveReference(reference, ctx);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async Product_findUniqueUser(
    @Args() args: Product_FindUniqueUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.Product_findUniqueUser(
      undefined,
      PrismaSelectArgs(info, args),
      ctx,
      info
    );
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async Product_findFirstUser(
    @Args() args: Product_FindFirstUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.Product_findFirstUser(
      undefined,
      PrismaSelectArgs(info, args),
      ctx,
      info
    );
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async Product_findManyUser(
    @Args() args: Product_FindManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.Product_findManyUser(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async Product_findManyUserCount(
    @Args() args: Product_FindManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.Product_findManyUserCount(
      undefined,
      PrismaSelectArgs(info, args),
      ctx,
      info
    );
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async Product_aggregateUser(
    @Args() args: Product_AggregateUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.Product_aggregateUser(
      undefined,
      PrismaSelectArgs(info, args),
      ctx,
      info
    );
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('create'))
  async Product_createOneUser(
    @Args() args: Product_CreateOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.Product_createOneUser(
      undefined,
      PrismaSelectArgs(info, args),
      ctx,
      info
    );
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('update'))
  async Product_updateOneUser(
    @Args() args: Product_UpdateOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.Product_updateOneUser(
      undefined,
      PrismaSelectArgs(info, args),
      ctx,
      info
    );
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('update'))
  async Product_updateManyUser(
    @Args() args: Product_UpdateManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.Product_updateManyUser(
      undefined,
      PrismaSelectArgs(info, args),
      ctx,
      info
    );
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('create', 'update'))
  async Product_upsertOneUser(
    @Args() args: Product_UpsertOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.Product_upsertOneUser(
      undefined,
      PrismaSelectArgs(info, args),
      ctx,
      info
    );
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('delete'))
  async Product_deleteOneUser(
    @Args() args: Product_DeleteOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.Product_deleteOneUser(
      undefined,
      PrismaSelectArgs(info, args),
      ctx,
      info
    );
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('delete'))
  async Product_deleteManyUser(
    @Args() args: Product_DeleteManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.Product_deleteManyUser(
      undefined,
      PrismaSelectArgs(info, args),
      ctx,
      info
    );
  }
}
