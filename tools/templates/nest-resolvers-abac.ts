const lowercase = (name: string) => name.charAt(0).toLowerCase() + name.slice(1);

export function NestResolversABACTemplate(name: string) {
  return `import { subject } from '@casl/ability';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CaslAbility, CaslGuard } from '@zen/nest-auth';
import { GraphQLResolveInfo } from 'graphql';

import { AppAbility } from '../../auth';
import { PrismaSelect, PrismaService } from '../../prisma';
import type {
  Aggregate${name}Args,
  CreateMany${name}Args,
  CreateOne${name}Args,
  DeleteMany${name}Args,
  DeleteOne${name}Args,
  FindFirst${name}Args,
  FindMany${name}Args,
  FindUnique${name}Args,
  UpdateMany${name}Args,
  UpdateOne${name}Args,
  UpsertOne${name}Args,
} from '../resolversTypes';

export const typeDefs = null;
// export const typeDefs = gql\`
//   extend type Query {
//     sample${name}Query: ${name}
//   }
//   extend type Mutation {
//     sample${name}Mutation(args: Int!): Boolean
//   }
//   extend type ${name} {
//     sample${name}Field: String
//   }
// \`;

@Resolver('${name}')
@UseGuards(CaslGuard)
export class ${name}Resolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query()
  async findUnique${name}(
    @Args() args: FindUnique${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const item = await this.prisma.${lowercase(name)}.findUnique({ where: args.where });
    if (ability.cannot('read', subject('${name}', item))) throw new ForbiddenException();
    return this.prisma.${lowercase(
      name
    )}.findUnique({ where: args.where, select: PrismaSelect(info, args) });
  }

  @Query()
  async findFirst${name}(
    @Args() args: FindFirst${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const item = await this.prisma.${lowercase(name)}.findFirst({ where: args.where });
    if (ability.cannot('read', subject('${name}', item))) throw new ForbiddenException();
    return this.prisma.${lowercase(
      name
    )}.findFirst({ where: args.where, select: PrismaSelect(info, args) });
  }

  @Query()
  async findMany${name}(
    @Args() args: FindMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const items = await this.prisma.${lowercase(name)}.findMany({ where: args.where });
    for (const item of items) {
      if (ability.cannot('read', subject('${name}', item))) throw new ForbiddenException();
    }
    return this.prisma.${lowercase(
      name
    )}.findMany({ where: args.where, select: PrismaSelect(info, args) });
  }

  @Query()
  async findMany${name}Count(
    @Args() args: FindMany${name}Args,
    @CaslAbility() ability: AppAbility
  ) {
    if (ability.cannot('read', '${name}')) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.count({ where: args.where });
  }

  @Query()
  async aggregate${name}(
    @Args() args: Aggregate${name}Args,
    @CaslAbility() ability: AppAbility
  ) {
    if (ability.cannot('read', '${name}')) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.aggregate({ where: args.where });
  }

  @Mutation()
  async createOne${name}(
    @Args() args: CreateOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    if (ability.cannot('create', subject('${name}', args.data as any))) throw new ForbiddenException();
    return this.prisma.${lowercase(
      name
    )}.create({ data: args.data, select: PrismaSelect(info, args) });
  }

  @Mutation()
  async createMany${name}(
    @Args() args: CreateMany${name}Args,
    @CaslAbility() ability: AppAbility
  ) {
    for (const item of args.data) {
      if (ability.cannot('create', subject('${name}', item as any))) throw new ForbiddenException();
    }
    return this.prisma.${lowercase(name)}.createMany({ data: args.data });
  }

  @Mutation()
  async updateOne${name}(
    @Args() args: UpdateOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const item = await this.prisma.${lowercase(name)}.findUnique({ where: args.where });
    if (ability.cannot('update', subject('${name}', item))) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.update({
      where: args.where,
      data: args.data,
      select: PrismaSelect(info, args),
    });
  }

  @Mutation()
  async updateMany${name}(
    @Args() args: UpdateMany${name}Args,
    @CaslAbility() ability: AppAbility
  ) {
    const items = await this.prisma.${lowercase(name)}.findMany({ where: args.where });
    for (const item of items) {
      if (ability.cannot('update', subject('${name}', item))) throw new ForbiddenException();
    }
    return this.prisma.${lowercase(name)}.updateMany({ where: args.where, data: args.data });
  }

  @Mutation()
  async upsertOne${name}(
    @Args() args: UpsertOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    if (
      ability.cannot('create', subject('${name}', args.create as any)) ||
      ability.cannot('update', subject('${name}', args.update as any))
    ) {
      throw new ForbiddenException();
    }
    return this.prisma.${lowercase(name)}.upsert({
      where: args.where,
      create: args.create,
      update: args.update,
      select: PrismaSelect(info, args),
    });
  }

  @Mutation()
  async deleteOne${name}(
    @Args() args: DeleteOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const item = await this.prisma.${lowercase(name)}.findUnique({ where: args.where });
    if (ability.cannot('delete', subject('${name}', item))) throw new ForbiddenException();
    return this.prisma.${lowercase(
      name
    )}.delete({ where: args.where, select: PrismaSelect(info, args) });
  }

  @Mutation()
  async deleteMany${name}(
    @Args() args: DeleteMany${name}Args,
    @CaslAbility() ability: AppAbility
  ) {
    const items = await this.prisma.${lowercase(name)}.findMany({ where: args.where });
    for (const item of items) {
      if (ability.cannot('delete', subject('${name}', item))) throw new ForbiddenException();
    }
    return this.prisma.${lowercase(name)}.deleteMany({ where: args.where });
  }
}
`;
}
