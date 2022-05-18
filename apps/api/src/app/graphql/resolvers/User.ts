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

import { UserAggregateSchema } from '../../../../../../prisma/generated/schemas/aggregateUser.schema';
import { UserCreateSchema } from '../../../../../../prisma/generated/schemas/createOneUser.schema';
import { UserDeleteManySchema } from '../../../../../../prisma/generated/schemas/deleteManyUser.schema';
import { UserDeleteOneSchema } from '../../../../../../prisma/generated/schemas/deleteOneUser.schema';
import { UserFindFirstSchema } from '../../../../../../prisma/generated/schemas/findFirstUser.schema';
import { UserFindManySchema } from '../../../../../../prisma/generated/schemas/findManyUser.schema';
import { UserFindUniqueSchema } from '../../../../../../prisma/generated/schemas/findUniqueUser.schema';
import { UserUpdateManySchema } from '../../../../../../prisma/generated/schemas/updateManyUser.schema';
import { UserUpdateOneSchema } from '../../../../../../prisma/generated/schemas/updateOneUser.schema';
import { UserUpsertSchema } from '../../../../../../prisma/generated/schemas/upsertOneUser.schema';
import { ForbidNestedCreateGuard, GqlGuard, Roles } from '../../auth';
import { SetSchema } from '../../validation/set-schema';
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

  @ResolveField()
  async googleId() {
    return null;
  }

  @Query()
  @SetSchema(UserFindUniqueSchema)
  async findUniqueUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findUniqueUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @SetSchema(UserFindFirstSchema)
  async findFirstUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findFirstUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @SetSchema(UserFindManySchema)
  async findManyUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findManyUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  async findManyUserCount(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findManyUserCount(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @SetSchema(UserAggregateSchema)
  async aggregateUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.aggregateUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @SetSchema(UserCreateSchema)
  async createOneUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.createOneUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @SetSchema(UserUpdateOneSchema)
  async updateOneUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.updateOneUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @SetSchema(UserDeleteOneSchema)
  async deleteOneUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.deleteOneUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @SetSchema(UserUpsertSchema)
  async upsertOneUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.upsertOneUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @SetSchema(UserDeleteManySchema)
  async deleteManyUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.deleteManyUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @SetSchema(UserUpdateManySchema)
  async updateManyUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.updateManyUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }
}
