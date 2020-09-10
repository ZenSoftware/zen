import { UseGuards } from '@nestjs/common';
import { Args, Context, Info, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import gql from 'graphql-tag';

import { GqlGuard, GqlUser, RequestUser, Role, Roles } from '../../auth';
import { Context as GqlContext } from '../context';
import { PrismaSelectArgs } from '../prisma-select-args';
import resolvers from '../prisma/Role/resolvers';

export const RoleTypeDef = null;
// export const RoleTypeDef = gql`
//   extend type Query {
//     sampleRoleQuery: Role!
//   }
//   extend type Mutation {
//     sampleRoleMutation(args: Int!): Boolean
//   }
//   extend type Role {
//     sampleRoleField: String
//   }
// `;

@Resolver('Role')
@UseGuards(GqlGuard)
@Roles(Role.Admin)
export class RoleResolver {
  @Query()
  async findOneRole(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Query.findOneRole(parent, PrismaSelectArgs(info, args), context);
  }

  @Query()
  async findManyRole(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Query.findManyRole(parent, PrismaSelectArgs(info, args), context);
  }

  @Query()
  async findManyRoleCount(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Query.findManyRoleCount(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async createOneRole(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.createOneRole(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async updateOneRole(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.updateOneRole(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async deleteOneRole(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.deleteOneRole(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async upsertOneRole(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.upsertOneRole(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async deleteManyRole(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.deleteManyRole(parent, PrismaSelectArgs(info, args), context);
  }

  @Mutation()
  async updateManyRole(@Parent() parent, @Info() info, @Args() args, @Context() context) {
    return resolvers.Mutation.updateManyRole(parent, PrismaSelectArgs(info, args), context);
  }
}
