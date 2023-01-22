const lowercase = (name: string) => name.charAt(0).toLowerCase() + name.slice(1);

export function NestResolversABACTemplate(name: string) {
  return `import { subject } from '@casl/ability';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CaslAbility, CaslAccessible, CaslGuard } from '@zen/nest-auth';
import { GraphQLResolveInfo } from 'graphql';

import { AppAbility, Accessible } from '../../auth';
import { PrismaSelectArgs, PrismaService } from '../../prisma';
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
  async findUnique${name}(
    @Args() args: FindUnique${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.${lowercase(name)}.findUnique(PrismaSelectArgs(info, args));
    if (ability.cannot('read', subject('${name}', record))) throw new ForbiddenException();
    return record;
  }

  @Query()
  async findFirst${name}(
    @Args() args: FindFirst${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.${lowercase(name)}.findFirst(PrismaSelectArgs(info, args));
    if (ability.cannot('read', subject('${name}', record))) throw new ForbiddenException();
    return record;
  }

  @Query()
  async findMany${name}(
    @Args() args: FindMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAccessible('${name}') accessible: Accessible['${name}']
  ) {
    args.where = { AND: [accessible as any, args.where] };
    return this.prisma.${lowercase(name)}.findMany(PrismaSelectArgs(info, args));
  }

  @Query()
  async findMany${name}Count(
    @Args() args: FindMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    if (ability.cannot('read', '${name}')) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.count(PrismaSelectArgs(info, args));
  }

  @Query()
  async aggregate${name}(
    @Args() args: Aggregate${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    if (ability.cannot('read', '${name}')) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.aggregate(PrismaSelectArgs(info, args));
  }

  @Mutation()
  async createOne${name}(
    @Args() args: CreateOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    if (ability.cannot('create', subject('${name}', args.data as any))) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.create(PrismaSelectArgs(info, args));
  }

  @Mutation()
  async updateOne${name}(
    @Args() args: UpdateOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.${lowercase(name)}.findUnique({ where: args.where });
    if (ability.cannot('update', subject('${name}', record))) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.update(PrismaSelectArgs(info, args));
  }

  @Mutation()
  async updateMany${name}(
    @Args() args: UpdateMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const records = await this.prisma.${lowercase(name)}.findMany({ where: args.where });
    for (const record of records) {
      if (ability.cannot('update', subject('${name}', record))) throw new ForbiddenException();
    }
    return this.prisma.${lowercase(name)}.updateMany(PrismaSelectArgs(info, args));
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
    return this.prisma.${lowercase(name)}.upsert(PrismaSelectArgs(info, args));
  }

  @Mutation()
  async deleteOne${name}(
    @Args() args: DeleteOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.${lowercase(name)}.findUnique(args);
    if (ability.cannot('delete', subject('${name}', record))) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.delete(PrismaSelectArgs(info, args));
  }

  @Mutation()
  async deleteMany${name}(
    @Args() args: DeleteMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const records = await this.prisma.${lowercase(name)}.findMany(args);
    for (const record of records) {
      if (ability.cannot('delete', subject('${name}', record))) throw new ForbiddenException();
    }
    return this.prisma.${lowercase(name)}.deleteMany(PrismaSelectArgs(info, args));
  }
}
`;
}
