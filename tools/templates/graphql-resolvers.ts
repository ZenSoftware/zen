const lowercase = (name: string) => name.charAt(0).toLowerCase() + name.slice(1);

export function GraphQLResolversTemplate(name: string) {
  return `import { subject } from '@casl/ability';
import { ForbiddenException, Inject, UseGuards } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CaslAbility, CaslGuard } from '@zen/nest-auth';
import { GraphQLResolveInfo } from 'graphql';

import { DEFAULT_FIELDS_TOKEN } from '../../auth';
import type { AppAbility } from '../../auth';
import { DefaultFields, PrismaSelectService, PrismaService, ${name} } from '../../prisma';
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
  ${name}WhereInput,
  ${name}WhereUniqueInput,
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
  constructor(
    @Inject(DEFAULT_FIELDS_TOKEN) private readonly defaultFields: DefaultFields,
    private readonly prisma: PrismaService,
    private readonly prismaSelect: PrismaSelectService
  ) {}

  @Query()
  async findUnique${name}(
    @Args() args: FindUnique${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.${lowercase(name)}.findUnique(
      this.prismaSelect.getArgs(info, args, this.defaultFields)
    );
    if (ability.cannot('read', subject('${name}', record as ${name}))) throw new ForbiddenException();
    return record;
  }

  @Query()
  async findFirst${name}(
    @Args() args: FindFirst${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.${lowercase(name)}.findFirst(
      this.prismaSelect.getArgs(info, args, this.defaultFields)
    );
    if (ability.cannot('read', subject('${name}', record as ${name}))) throw new ForbiddenException();
    return record;
  }

  @Query()
  async findMany${name}(
    @Args() args: FindMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const records = await this.prisma.${lowercase(name)}.findMany(
      this.prismaSelect.getArgs(info, args, this.defaultFields)
    );
    for (const record of records) {
      if (ability.cannot('read', subject('${name}', record))) throw new ForbiddenException();
    }
    return records;
  }

  @Query()
  async findMany${name}Count(
    @Args() args: FindMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    if (ability.cannot('read', '${name}')) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.count(this.prismaSelect.getArgs(info, args));
  }

  @Query()
  async aggregate${name}(
    @Args() args: Aggregate${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    if (ability.cannot('read', '${name}')) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.aggregate(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async createOne${name}(
    @Args() args: CreateOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    if (ability.cannot('create', subject('${name}', args.data as any))) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.create(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async updateOne${name}(
    @Args() args: UpdateOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.${lowercase(name)}.findUnique({
      where: args.where as ${name}WhereUniqueInput,
      select: this.defaultFields.${name},
    });
    if (ability.cannot('update', subject('${name}', record as ${name}))) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.update(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async updateMany${name}(
    @Args() args: UpdateMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const records = await this.prisma.${lowercase(name)}.findMany({
      where: args.where,
      select: this.defaultFields.${name},
    });
    for (const record of records) {
      if (ability.cannot('update', subject('${name}', record as ${name}))) throw new ForbiddenException();
    }
    return this.prisma.${lowercase(name)}.updateMany(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async upsertOne${name}(
    @Args() args: UpsertOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.${lowercase(name)}.findFirst({
      where: args.where,
      select: this.defaultFields.${name},
    });
    if (
      (record && ability.cannot('update', subject('${name}', record as ${name}))) ||
      ability.cannot('create', subject('${name}', args.create as any))
    ) {
      throw new ForbiddenException();
    }
    return this.prisma.${lowercase(name)}.upsert(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async deleteOne${name}(
    @Args() args: DeleteOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.${lowercase(name)}.findUnique({
      where: args.where as ${name}WhereUniqueInput,
      select: this.defaultFields.${name},
    });
    if (ability.cannot('delete', subject('${name}', record as ${name}))) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.delete(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async deleteMany${name}(
    @Args() args: DeleteMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const records = await this.prisma.${lowercase(name)}.findMany({
      where: args.where as ${name}WhereInput,
      select: this.defaultFields.${name},
    });
    for (const record of records) {
      if (ability.cannot('delete', subject('${name}', record as ${name}))) throw new ForbiddenException();
    }
    return this.prisma.${lowercase(name)}.deleteMany(this.prismaSelect.getArgs(info, args));
  }
}
`;
}
