import { Args, Context, Info, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';

import { PrismaSelectArgs } from '../prisma-select';
import resolvers from '../prisma/User/resolvers';

@Resolver('User')
export class UserResolver {
  @Query()
  async findOneUser(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Query.findOneUser(parent, PrismaSelectArgs(info, args), context);
  }

  @Query()
  async findManyUser(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Query.findManyUser(parent, PrismaSelectArgs(info, args), context);
  }

  @Query()
  async findManyUserCount(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Query.findManyUserCount(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async createOneUser(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.createOneUser(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async updateOneUser(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.updateOneUser(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async deleteOneUser(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.deleteOneUser(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async upsertOneUser(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.upsertOneUser(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async deleteManyUser(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.deleteManyUser(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async updateManyUser(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.updateManyUser(parent, PrismaSelectArgs(info, args), context);
  }
}
