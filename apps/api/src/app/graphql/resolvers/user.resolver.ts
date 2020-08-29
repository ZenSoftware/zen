import { Args, Context, Info, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';

import { PrismaSelectArgs } from '../prisma-select';
import resolvers from '../prisma/User/resolvers';

@Resolver('User')
export class UserResolver {
  @Query()
  async findOneUser(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Query.findOneUser(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async createOneUser(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.createOneUser(parent, PrismaSelectArgs(info, args), context);
  }
}
