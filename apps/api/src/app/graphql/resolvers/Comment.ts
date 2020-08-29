import { Args, Context, Info, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';

import { PrismaSelectArgs } from '../prisma-select';
import resolvers from '../prisma/Comment/resolvers';

@Resolver('Comment')
export class CommentResolver {
  @Query()
  async findOneComment(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Query.findOneComment(parent, PrismaSelectArgs(info, args), context);
  }

  @Query()
  async findManyComment(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Query.findManyComment(parent, PrismaSelectArgs(info, args), context);
  }

  @Query()
  async findManyCommentCount(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Query.findManyCommentCount(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async createOneComment(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.createOneComment(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async updateOneComment(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.updateOneComment(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async deleteOneComment(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.deleteOneComment(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async upsertOneComment(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.upsertOneComment(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async deleteManyComment(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.deleteManyComment(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async updateManyComment(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.updateManyComment(parent, PrismaSelectArgs(info, args), context);
  }
}
