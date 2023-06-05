import { Inject, UseGuards } from '@nestjs/common';
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import type { NonNullableFields } from '@zen/common';
import { RolesGuard } from '@zen/nest-auth';
import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';

import { AUTH_FIELDS_TOKEN, AuthService } from '../../../auth';
import { DefaultFields, PrismaSelectService, PrismaService, User } from '../../../prisma';
import type {
  AggregateUserArgs,
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
    @Inject(AUTH_FIELDS_TOKEN) private readonly authFields: DefaultFields,
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
  async findUniqueUser(
    @Args() args: NonNullableFields<FindUniqueUserArgs>,
    @Info() info: GraphQLResolveInfo
  ) {
    return this.prisma.user.findUnique(this.prismaSelect.getArgs(info, args));
  }

  @Query()
  async findFirstUser(
    @Args() args: NonNullableFields<FindFirstUserArgs>,
    @Info() info: GraphQLResolveInfo
  ) {
    return this.prisma.user.findFirst(this.prismaSelect.getArgs(info, args));
  }

  @Query()
  async findManyUser(@Args() args: FindManyUserArgs, @Info() info: GraphQLResolveInfo) {
    return this.prisma.user.findMany(this.prismaSelect.getArgs(info, args));
  }

  @Query()
  async findManyUserCount(@Args() args: FindManyUserArgs, @Info() info: GraphQLResolveInfo) {
    return this.prisma.user.count(this.prismaSelect.getArgs(info, args));
  }

  @Query()
  async aggregateUser(@Args() args: AggregateUserArgs, @Info() info: GraphQLResolveInfo) {
    return this.prisma.user.aggregate(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async createOneUser(@Args() args: CreateOneUserArgs, @Info() info: GraphQLResolveInfo) {
    return this.prisma.user.create(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async updateOneUser(
    @Args() args: NonNullableFields<UpdateOneUserArgs>,
    @Info() info: GraphQLResolveInfo
  ) {
    return this.prisma.user.update(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async updateManyUser(@Args() args: UpdateManyUserArgs, @Info() info: GraphQLResolveInfo) {
    return this.prisma.user.updateMany(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async upsertOneUser(@Args() args: UpsertOneUserArgs, @Info() info: GraphQLResolveInfo) {
    return this.prisma.user.upsert(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async deleteOneUser(
    @Args() args: NonNullableFields<DeleteOneUserArgs>,
    @Info() info: GraphQLResolveInfo
  ) {
    return this.prisma.user.delete(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async deleteManyUser(@Args() args: DeleteManyUserArgs, @Info() info: GraphQLResolveInfo) {
    return this.prisma.user.deleteMany(this.prismaSelect.getArgs(info, args));
  }
}
