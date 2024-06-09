import { UseGuards } from '@nestjs/common';
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RolesGuard } from '@zen/nest-auth';
import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';

import { AuthService } from '../../../auth';
import { PrismaSelectService, PrismaService, User } from '../../../prisma';
import type {
  AggregateUserArgs,
  CreateManyUserArgs,
  CreateOneUserArgs,
  DeleteManyUserArgs,
  DeleteOneUserArgs,
  FindFirstUserArgs,
  FindManyUserArgs,
  FindUniqueUserArgs,
  UpdateManyUserArgs,
  UpdateOneUserArgs,
  UpsertOneUserArgs,
} from '../../resolversTypes';

export const typeDefs = gql`
  extend type User {
    rules: [Json!]!
  }
`;

@Resolver('User')
@UseGuards(RolesGuard('Prisma'))
export class UserResolver {
  constructor(
    private readonly auth: AuthService,
    private readonly prisma: PrismaService,
    private readonly prismaSelect: PrismaSelectService
  ) {}

  @ResolveField()
  async password() {
    return null;
  }

  @ResolveField()
  async rules(@Parent() parent: User) {
    const ability = await this.auth.createAbility(parent);
    return ability.rules;
  }

  @Query()
  async findUniqueUser(@Args() args: FindUniqueUserArgs, @Info() info: GraphQLResolveInfo) {
    return this.prisma.user.findUnique(this.prismaSelect.getArgs(args, info));
  }

  @Query()
  async findFirstUser(@Args() args: FindFirstUserArgs, @Info() info: GraphQLResolveInfo) {
    return this.prisma.user.findFirst(this.prismaSelect.getArgs(args, info));
  }

  @Query()
  async findManyUser(@Args() args: FindManyUserArgs, @Info() info: GraphQLResolveInfo) {
    return this.prisma.user.findMany(this.prismaSelect.getArgs(args, info));
  }

  @Query()
  async findManyUserCount(@Args() args: FindManyUserArgs, @Info() info: GraphQLResolveInfo) {
    return this.prisma.user.count(this.prismaSelect.getArgs(args, info) as any);
  }

  @Query()
  async aggregateUser(@Args() args: AggregateUserArgs) {
    return this.prisma.user.aggregate(args);
  }

  @Mutation()
  async createOneUser(@Args() args: CreateOneUserArgs, @Info() info: GraphQLResolveInfo) {
    return this.prisma.user.create(this.prismaSelect.getArgs(args, info));
  }

  @Mutation()
  async createManyUser(@Args() args: CreateManyUserArgs) {
    return this.prisma.user.createMany(args);
  }

  @Mutation()
  async createManyUserAndReturn(
    @Args() args: CreateManyUserArgs,
    @Info() info: GraphQLResolveInfo
  ) {
    return this.prisma.user.createManyAndReturn(this.prismaSelect.getArgs(args, info));
  }

  @Mutation()
  async updateOneUser(@Args() args: UpdateOneUserArgs, @Info() info: GraphQLResolveInfo) {
    return this.prisma.user.update(this.prismaSelect.getArgs(args, info));
  }

  @Mutation()
  async upsertOneUser(@Args() args: UpsertOneUserArgs, @Info() info: GraphQLResolveInfo) {
    return this.prisma.user.upsert(this.prismaSelect.getArgs(args, info));
  }

  @Mutation()
  async deleteOneUser(@Args() args: DeleteOneUserArgs, @Info() info: GraphQLResolveInfo) {
    return this.prisma.user.delete(this.prismaSelect.getArgs(args, info));
  }

  @Mutation()
  async deleteManyUser(@Args() args: DeleteManyUserArgs) {
    return this.prisma.user.deleteMany(args);
  }

  @Mutation()
  async updateManyUser(@Args() args: UpdateManyUserArgs, @Info() info: GraphQLResolveInfo) {
    return this.prisma.user.updateMany(this.prismaSelect.getArgs(args, info));
  }
}
