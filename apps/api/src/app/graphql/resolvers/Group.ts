import { Args, Context, Info, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import gql from 'graphql-tag';

import { PrismaSelectArgs } from '../prisma-select-args';
import resolvers from '../prisma/Group/resolvers';

export const GroupTypeDef = null;
// export const GroupTypeDef = gql`
//   extend type Query {
//     sampleGroupQuery: Group!
//   }
//   extend type Mutation {
//     sampleGroupMutation(args: Int!): Boolean
//   }
//   extend type Group {
//     sampleGroupField: String
//   }
// `;

@Resolver('Group')
export class GroupResolver {
  @Query()
  async findOneGroup(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Query.findOneGroup(parent, PrismaSelectArgs(info, args), context);
  }

  @Query()
  async findManyGroup(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Query.findManyGroup(parent, PrismaSelectArgs(info, args), context);
  }

  @Query()
  async findManyGroupCount(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Query.findManyGroupCount(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async createOneGroup(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.createOneGroup(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async updateOneGroup(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.updateOneGroup(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async deleteOneGroup(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.deleteOneGroup(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async upsertOneGroup(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.upsertOneGroup(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async deleteManyGroup(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.deleteManyGroup(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async updateManyGroup(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.updateManyGroup(parent, PrismaSelectArgs(info, args), context);
  }
}
