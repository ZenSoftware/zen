import { Args, Context, Info, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import gql from 'graphql-tag';

import { PrismaSelectArgs } from '../prisma-select-args';
import resolvers from '../prisma/Post/resolvers';

export const PostTypeDef = null;
// export const PostTypeDef = gql`
//   extend type Query {
//     samplePostQuery: Post!
//   }
//   extend type Mutation {
//     samplePostMutation(args: Int!): Boolean
//   }
//   extend type Post {
//     samplePostField: String
//   }
// `;

@Resolver('Post')
export class PostResolver {
  @Query()
  async findOnePost(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Query.findOnePost(parent, PrismaSelectArgs(info, args), context);
  }

  @Query()
  async findManyPost(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Query.findManyPost(parent, PrismaSelectArgs(info, args), context);
  }

  @Query()
  async findManyPostCount(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Query.findManyPostCount(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async createOnePost(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.createOnePost(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async updateOnePost(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.updateOnePost(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async deleteOnePost(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.deleteOnePost(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async upsertOnePost(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.upsertOnePost(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async deleteManyPost(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.deleteManyPost(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async updateManyPost(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.updateManyPost(parent, PrismaSelectArgs(info, args), context);
  }
}
