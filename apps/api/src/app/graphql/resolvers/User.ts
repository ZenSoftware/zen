import { UseGuards } from '@nestjs/common';
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
import gql from 'graphql-tag';

import { GqlGuard, GqlUser, RequestUser, Roles } from '../../auth';
import resolvers from '../generated/User/resolvers';
import { IContext } from '../models';
import { PrismaSelectArgs } from '../prisma-select-args';

export const UserTypeDef = null;
// export const UserTypeDef = gql`
//   extend type Query {
//     sampleUserQuery: User!
//   }
//   extend type Mutation {
//     sampleUserMutation(args: Int!): Boolean
//   }
//   extend type User {
//     sampleUserField: String
//   }
// `;

@Resolver('User')
@UseGuards(GqlGuard)
@Roles('Super')
export class UserResolver {
  @ResolveField()
  async password() {
    return '';
  }

  @Query()
  async findUniqueUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findUniqueUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  async findFirstUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findFirstUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  async findManyUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findManyUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  async findManyUserCount(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findManyUserCount(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  async aggregateUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.aggregateUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  async createOneUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.createOneUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  async updateOneUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.updateOneUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  async deleteOneUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.deleteOneUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  async upsertOneUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.upsertOneUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  async deleteManyUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.deleteManyUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  async updateManyUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.updateManyUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }
}
