const lowercase = (name: string) => name.charAt(0).toLowerCase() + name.slice(1);

export function NestResolversABACTemplate(name: string) {
  return `import { subject } from '@casl/ability';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CaslAbility, CaslGuard } from '@zen/nest-auth';

import { AppAbility } from '../../auth';
import { PrismaService } from '../../prisma';
import type {
  Aggregate${name}Args,
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
  async findUnique${name}(@CaslAbility() ability: AppAbility, @Args() args: FindUnique${name}Args) {
    const item = await this.prisma.${lowercase(name)}.findUnique({ where: args.where });
    if (ability.cannot('read', subject('${name}', item))) throw new ForbiddenException();
    return item;
  }

  @Query()
  async findFirst${name}(@CaslAbility() ability: AppAbility, @Args() args: FindFirst${name}Args) {
    const item = await this.prisma.${lowercase(name)}.findFirst({ where: args.where });
    if (ability.cannot('read', subject('${name}', item))) throw new ForbiddenException();
    return item;
  }

  @Query()
  async findMany${name}(@CaslAbility() ability: AppAbility, @Args() args: FindMany${name}Args) {
    const items = await this.prisma.${lowercase(name)}.findMany({ where: args.where });
    for (const item of items) {
      if (ability.cannot('read', subject('${name}', item))) throw new ForbiddenException();
    }
    return items;
  }

  @Query()
  async findMany${name}Count(@CaslAbility() ability: AppAbility, @Args() args: FindMany${name}Args) {
    if (ability.cannot('read', '${name}')) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.count({ where: args.where });
  }

  @Query()
  async aggregate${name}(@CaslAbility() ability: AppAbility, @Args() args: Aggregate${name}Args) {
    if (ability.cannot('read', '${name}')) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.aggregate({ where: args.where });
  }

  @Mutation()
  async createOne${name}(@CaslAbility() ability: AppAbility, @Args() args: CreateOne${name}Args) {
    if (ability.cannot('create', subject('${name}', args.data as any))) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.create({ data: args.data });
  }

  @Mutation()
  async updateOne${name}(@CaslAbility() ability: AppAbility, @Args() args: UpdateOne${name}Args) {
    const item = await this.prisma.${lowercase(name)}.findUnique({ where: args.where });
    if (ability.cannot('update', subject('${name}', item))) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.update({ where: args.where, data: args.data });
  }

  @Mutation()
  async updateMany${name}(@CaslAbility() ability: AppAbility, @Args() args: UpdateMany${name}Args) {
    const items = await this.prisma.${lowercase(name)}.findMany({ where: args.where });
    for (const item of items) {
      if (ability.cannot('update', subject('${name}', item))) throw new ForbiddenException();
    }
    return this.prisma.${lowercase(name)}.updateMany({ where: args.where, data: args.data });
  }

  @Mutation()
  async upsertOne${name}(@CaslAbility() ability: AppAbility, @Args() args: UpsertOne${name}Args) {
    if (
      ability.cannot('create', subject('${name}', args.create as any)) ||
      ability.cannot('update', subject('${name}', args.update as any))
    ) {
      throw new ForbiddenException();
    }
    return this.prisma.${lowercase(
      name
    )}.upsert({ where: args.where, create: args.create, update: args.update });
  }

  @Mutation()
  async deleteOne${name}(@CaslAbility() ability: AppAbility, @Args() args: DeleteOne${name}Args) {
    const item = await this.prisma.${lowercase(name)}.findUnique({ where: args.where });
    if (ability.cannot('delete', subject('${name}', item))) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.delete({ where: args.where });
  }

  @Mutation()
  async deleteMany${name}(@CaslAbility() ability: AppAbility, @Args() args: DeleteMany${name}Args) {
    const items = await this.prisma.${lowercase(name)}.findMany({ where: args.where });
    for (const item of items) {
      if (ability.cannot('delete', subject('${name}', item))) throw new ForbiddenException();
    }
    return this.prisma.${lowercase(name)}.deleteMany({ where: args.where });
  }
}
`;
}
