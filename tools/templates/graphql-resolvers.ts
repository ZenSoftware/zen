const lowercase = (name: string) => name.charAt(0).toLowerCase() + name.slice(1);

export function GraphQLResolversTemplate(name: string) {
  return `import { subject } from '@casl/ability';
import { ForbiddenException, Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import type { NonNullableFields } from '@zen/common';
import { CaslAbility, CaslGuard, CaslPolicy } from '@zen/nest-auth';
import { GraphQLResolveInfo } from 'graphql';

import { AUTH_FIELDS_TOKEN } from '../../../auth';
import type { AppAbility } from '../../../auth';
import { DefaultFields, PrismaSelectService, PrismaService, ${name} } from '../../../prisma';
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
} from '../../resolversTypes';

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
    @Inject(AUTH_FIELDS_TOKEN) private readonly authFields: DefaultFields,
    private readonly prisma: PrismaService,
    private readonly prismaSelect: PrismaSelectService
  ) {}

  @Query()
  @CaslPolicy(ability => ability.can('read', '${name}'))
  async findUnique${name}(
    @Args() args: NonNullableFields<FindUnique${name}Args>,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.${lowercase(name)}.findUnique(
      this.prismaSelect.getArgs(info, args, this.authFields)
    );
    if (record && ability.cannot('read', subject('${name}', record))) throw new ForbiddenException();
    return record;
  }

  @Query()
  @CaslPolicy(ability => ability.can('read', '${name}'))
  async findFirst${name}(
    @Args() args: NonNullableFields<FindFirst${name}Args>,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.${lowercase(name)}.findFirst(
      this.prismaSelect.getArgs(info, args, this.authFields)
    );
    if (record && ability.cannot('read', subject('${name}', record))) throw new ForbiddenException();
    return record;
  }

  @Query()
  @CaslPolicy(ability => ability.can('read', '${name}'))
  async findMany${name}(
    @Args() args: FindMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const records = await this.prisma.${lowercase(name)}.findMany(
      this.prismaSelect.getArgs(info, args, this.authFields)
    );
    for (const record of records) {
      if (ability.cannot('read', subject('${name}', record))) throw new ForbiddenException();
    }
    return records;
  }

  @Query()
  @CaslPolicy(ability => ability.can('read', '${name}'))
  async findMany${name}Count(@Args() args: FindMany${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(name)}.count(this.prismaSelect.getArgs(info, args));
  }

  @Query()
  @CaslPolicy(ability => ability.can('read', '${name}'))
  async aggregate${name}(@Args() args: Aggregate${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(name)}.aggregate(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  @CaslPolicy(ability => ability.can('create', '${name}'))
  async createOne${name}(
    @Args() args: CreateOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    return this.prisma.$transaction(async tx => {
      const record = await tx.${lowercase(
        name
      )}.create(this.prismaSelect.getArgs(info, args, this.authFields));
      if (ability.cannot('create', subject('${name}', record))) throw new ForbiddenException();
      return record;
    });
  }

  @Mutation()
  @CaslPolicy(ability => ability.can('update', '${name}'))
  async updateOne${name}(
    @Args() args: NonNullableFields<UpdateOne${name}Args>,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.${lowercase(name)}.findUnique({
      where: args.where,
      select: this.authFields.${name},
    });
    if (!record) throw new NotFoundException();
    if (ability.cannot('update', subject('${name}', record as ${name}))) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.update(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  @CaslPolicy(ability => ability.can('update', '${name}'))
  async updateMany${name}(
    @Args() args: UpdateMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const records = await this.prisma.${lowercase(name)}.findMany({
      where: args.where,
      select: this.authFields.${name},
    });
    for (const record of records) {
      if (ability.cannot('update', subject('${name}', record as ${name}))) throw new ForbiddenException();
    }
    return this.prisma.${lowercase(name)}.updateMany(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  @CaslPolicy(ability => ability.can('create', '${name}') && ability.can('update', '${name}'))
  async upsertOne${name}(
    @Args() args: UpsertOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const existingRecord = await this.prisma.${lowercase(name)}.findFirst({
      where: args.where,
      select: this.authFields.${name},
    });

    if (existingRecord && ability.cannot('update', subject('${name}', existingRecord as ${name})))
      throw new ForbiddenException();

    return this.prisma.$transaction(async tx => {
      const record = await tx.${lowercase(
        name
      )}.upsert(this.prismaSelect.getArgs(info, args, this.authFields));
      if (!existingRecord && ability.cannot('create', subject('${name}', record)))
        throw new ForbiddenException();
      return record;
    });
  }

  @Mutation()
  @CaslPolicy(ability => ability.can('delete', '${name}'))
  async deleteOne${name}(
    @Args() args: NonNullableFields<DeleteOne${name}Args>,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const record = await this.prisma.${lowercase(name)}.findUnique({
      where: args.where,
      select: this.authFields.${name},
    });
    if (ability.cannot('delete', subject('${name}', record as ${name}))) throw new ForbiddenException();
    return this.prisma.${lowercase(name)}.delete(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  @CaslPolicy(ability => ability.can('delete', '${name}'))
  async deleteMany${name}(
    @Args() args: DeleteMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @CaslAbility() ability: AppAbility
  ) {
    const records = await this.prisma.${lowercase(name)}.findMany({
      where: args.where,
      select: this.authFields.${name},
    });
    for (const record of records) {
      if (ability.cannot('delete', subject('${name}', record as ${name}))) throw new ForbiddenException();
    }
    return this.prisma.${lowercase(name)}.deleteMany(this.prismaSelect.getArgs(info, args));
  }
}
`;
}
