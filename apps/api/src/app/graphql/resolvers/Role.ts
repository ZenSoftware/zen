import { UseGuards } from '@nestjs/common';
import { Args, Context, Info, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import gql from 'graphql-tag';

import { GqlGuard, GqlUser, RequestUser, Role, Roles } from '../../auth';
import { IContext } from '../models';
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
  async findOneRole(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findOneRole(parent, PrismaSelectArgs(info, args), ctx);
  }

  @Query()
  async findManyRole(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findManyRole(parent, PrismaSelectArgs(info, args), ctx);
  }

  @Query()
  async findManyRoleCount(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findManyRoleCount(parent, PrismaSelectArgs(info, args), ctx);
  }

  @Mutation()
  async createOneRole(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.createOneRole(parent, PrismaSelectArgs(info, args), ctx);
  }

  @Mutation()
  async updateOneRole(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.updateOneRole(parent, PrismaSelectArgs(info, args), ctx);
  }

  @Mutation()
  async deleteOneRole(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.deleteOneRole(parent, PrismaSelectArgs(info, args), ctx);
  }

  @Mutation()
  async upsertOneRole(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.upsertOneRole(parent, PrismaSelectArgs(info, args), ctx);
  }

  @Mutation()
  async deleteManyRole(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.deleteManyRole(parent, PrismaSelectArgs(info, args), ctx);
  }

  @Mutation()
  async updateManyRole(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.updateManyRole(parent, PrismaSelectArgs(info, args), ctx);
  }
}
