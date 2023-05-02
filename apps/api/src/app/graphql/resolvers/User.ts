import { subject } from '@casl/ability';
import { ForbiddenException, Inject, UseGuards } from '@nestjs/common';
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import type { NonNullableFields } from '@zen/common';
import { CaslAbility, CaslGuard } from '@zen/nest-auth';
import { GraphQLResolveInfo } from 'graphql';
import { gql } from 'graphql-tag';

import { AUTH_FIELDS_TOKEN, AuthService } from '../../auth';
import type { AppAbility } from '../../auth';
import { DefaultFields, PrismaSelectService, PrismaService, User } from '../../prisma';
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
} from '../resolversTypes';

export const typeDefs = gql`
  extend type User {
    rules: [Json!]!
  }
`;

@Resolver('User')
@UseGuards(CaslGuard)
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
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.user.findUnique(
      this.prismaSelect.getArgs(info, args, this.authFields)
    );
    if (ability.cannot('read', subject('User', record as User))) throw new ForbiddenException();
    return record;
  }

  @Query()
  async findFirstUser(
    @Args() args: NonNullableFields<FindFirstUserArgs>,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.user.findFirst(
      this.prismaSelect.getArgs(info, args, this.authFields)
    );
    if (ability.cannot('read', subject('User', record as User))) throw new ForbiddenException();
    return record;
  }

  @Query()
  async findManyUser(
    @Args() args: FindManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const records = await this.prisma.user.findMany(
      this.prismaSelect.getArgs(info, args, this.authFields)
    );
    for (const record of records) {
      if (ability.cannot('read', subject('User', record))) throw new ForbiddenException();
    }
    return records;
  }

  @Query()
  async findManyUserCount(
    @Args() args: FindManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    if (ability.cannot('read', 'User')) throw new ForbiddenException();
    return this.prisma.user.count(this.prismaSelect.getArgs(info, args));
  }

  @Query()
  async aggregateUser(
    @Args() args: AggregateUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    if (ability.cannot('read', 'User')) throw new ForbiddenException();
    return this.prisma.user.aggregate(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async createOneUser(
    @Args() args: CreateOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    return this.prisma.$transaction(async tx => {
      const record = await tx.user.create(this.prismaSelect.getArgs(info, args, this.authFields));
      if (ability.cannot('create', subject('User', record))) throw new ForbiddenException();
      return record;
    });
  }

  @Mutation()
  async updateOneUser(
    @Args() args: NonNullableFields<UpdateOneUserArgs>,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.user.findUnique({
      where: args.where,
      select: this.authFields.User,
    });
    if (ability.cannot('update', subject('User', record as User))) throw new ForbiddenException();
    return this.prisma.user.update(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async updateManyUser(
    @Args() args: UpdateManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const records = await this.prisma.user.findMany({
      where: args.where,
      select: this.authFields.User,
    });
    for (const record of records) {
      if (ability.cannot('update', subject('User', record as User))) throw new ForbiddenException();
    }
    return this.prisma.user.updateMany(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async upsertOneUser(
    @Args() args: UpsertOneUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const existingRecord = await this.prisma.user.findFirst({
      where: args.where,
      select: this.authFields.User,
    });

    if (existingRecord && ability.cannot('update', subject('User', existingRecord as User)))
      throw new ForbiddenException();

    return this.prisma.$transaction(async tx => {
      const record = await tx.user.upsert(this.prismaSelect.getArgs(info, args, this.authFields));
      if (!existingRecord && ability.cannot('create', subject('User', record)))
        throw new ForbiddenException();
      return record;
    });
  }

  @Mutation()
  async deleteOneUser(
    @Args() args: NonNullableFields<DeleteOneUserArgs>,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.user.findUnique({
      where: args.where,
      select: this.authFields.User,
    });
    if (ability.cannot('delete', subject('User', record as User))) throw new ForbiddenException();
    return this.prisma.user.delete(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async deleteManyUser(
    @Args() args: DeleteManyUserArgs,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const records = await this.prisma.user.findMany({
      where: args.where,
      select: this.authFields.User,
    });
    for (const record of records) {
      if (ability.cannot('delete', subject('User', record as User))) throw new ForbiddenException();
    }
    return this.prisma.user.deleteMany(this.prismaSelect.getArgs(info, args));
  }
}
