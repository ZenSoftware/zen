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

import { ForbidNestedCreateGuard, GqlGuard, Roles } from '../../auth';
import { PrismaSelectArgs } from '../../prisma';
import resolvers from '../generated/User/resolvers';

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
@UseGuards(GqlGuard, ForbidNestedCreateGuard())
@Roles('Super')
export class UserResolver {
  @ResolveField()
  async password() {
    return null;
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
