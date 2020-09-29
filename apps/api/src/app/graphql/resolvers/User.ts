import { UseGuards } from '@nestjs/common';
import { Args, Context, Info, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import gql from 'graphql-tag';

import { GqlGuard, GqlUser, RequestUser, Role, Roles } from '../../auth';
import { IContext } from '../models';
import { PrismaSelectArgs } from '../prisma-select-args';
import resolvers from '../prisma/User/resolvers';

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
@Roles('Admin')
export class UserResolver {
  @Query()
  async findOneUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findOneUser(parent, PrismaSelectArgs(info, args), ctx);
  }

  @Query()
  async findManyUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findManyUser(parent, PrismaSelectArgs(info, args), ctx);
  }

  @Query()
  async findManyUserCount(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findManyUserCount(parent, PrismaSelectArgs(info, args), ctx);
  }

  @Query()
  async aggregateUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.aggregateUser(parent, PrismaSelectArgs(info, args), ctx);
  }

  @Mutation()
  async createOneUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.createOneUser(parent, PrismaSelectArgs(info, args), ctx);
  }

  @Mutation()
  async updateOneUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.updateOneUser(parent, PrismaSelectArgs(info, args), ctx);
  }

  @Mutation()
  async deleteOneUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.deleteOneUser(parent, PrismaSelectArgs(info, args), ctx);
  }

  @Mutation()
  async upsertOneUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.upsertOneUser(parent, PrismaSelectArgs(info, args), ctx);
  }

  @Mutation()
  async deleteManyUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.deleteManyUser(parent, PrismaSelectArgs(info, args), ctx);
  }

  @Mutation()
  async updateManyUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.updateManyUser(parent, PrismaSelectArgs(info, args), ctx);
  }
}
