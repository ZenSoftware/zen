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
import { User } from '@prisma/client';
import gql from 'graphql-tag';

import { CaslAbilityFactory, CaslSubject, GqlCaslGuard } from '../../auth';
import { PrismaSelectArgs } from '../../prisma';
import resolvers from '../generated/User/resolvers';

export const typeDefs = gql`
  extend type User {
    rules: [Json!]!
  }
`;

@Resolver('User')
@CaslSubject('User')
export class UserResolver {
  constructor(private readonly caslAbilityFactory: CaslAbilityFactory) {}

  @ResolveField()
  async password() {
    return null;
  }

  @ResolveField()
  async rules(@Parent() user: User) {
    const ability = this.caslAbilityFactory.createAbility(user);
    return ability.rules;
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findUniqueUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findUniqueUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findFirstUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findFirstUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findManyUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findManyUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findManyUserCount(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findManyUserCount(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async aggregateUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.aggregateUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('create'))
  async createOneUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.createOneUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('update'))
  async updateOneUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.updateOneUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('update'))
  async updateManyUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.updateManyUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('create', 'update'))
  async upsertOneUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.upsertOneUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('delete'))
  async deleteOneUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.deleteOneUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('delete'))
  async deleteManyUser(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.deleteManyUser(parent, PrismaSelectArgs(info, args), ctx, info);
  }
}
