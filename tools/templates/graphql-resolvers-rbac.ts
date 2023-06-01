const lowercase = (name: string) => name.charAt(0).toLowerCase() + name.slice(1);

export function GraphQLResolversRBACTemplate(name: string) {
  return `import { Inject, UseGuards } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import type { NonNullableFields } from '@zen/common';
import { RolesGuard } from '@zen/nest-auth';
import { GraphQLResolveInfo } from 'graphql';

import { AUTH_FIELDS_TOKEN } from '../../../auth';
import { DefaultFields, PrismaSelectService, PrismaService } from '../../../prisma';
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
@UseGuards(RolesGuard('Super'))
export class ${name}Resolver {
  constructor(
    @Inject(AUTH_FIELDS_TOKEN) private readonly authFields: DefaultFields,
    private readonly prisma: PrismaService,
    private readonly prismaSelect: PrismaSelectService
  ) {}

  @Query()
  async findUnique${name}(
    @Args() args: NonNullableFields<FindUnique${name}Args>,
    @Info() info: GraphQLResolveInfo
  ) {
    return this.prisma.${lowercase(
      name
    )}.findUnique(this.prismaSelect.getArgs(info, args, this.authFields));
  }

  @Query()
  async findFirst${name}(
    @Args() args: NonNullableFields<FindFirst${name}Args>,
    @Info() info: GraphQLResolveInfo
  ) {
    return this.prisma.${lowercase(
      name
    )}.findFirst(this.prismaSelect.getArgs(info, args, this.authFields));
  }

  @Query()
  async findMany${name}(@Args() args: FindMany${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(
      name
    )}.findMany(this.prismaSelect.getArgs(info, args, this.authFields));
  }

  @Query()
  async findMany${name}Count(@Args() args: FindMany${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(name)}.count(this.prismaSelect.getArgs(info, args));
  }

  @Query()
  async aggregate${name}(@Args() args: Aggregate${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(name)}.aggregate(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async createOne${name}(@Args() args: CreateOne${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(
      name
    )}.create(this.prismaSelect.getArgs(info, args, this.authFields));
  }

  @Mutation()
  async updateOne${name}(
    @Args() args: NonNullableFields<UpdateOne${name}Args>,
    @Info() info: GraphQLResolveInfo
  ) {
    return this.prisma.${lowercase(name)}.update(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async updateMany${name}(@Args() args: UpdateMany${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(name)}.updateMany(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async upsertOne${name}(@Args() args: UpsertOne${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(
      name
    )}.upsert(this.prismaSelect.getArgs(info, args, this.authFields));
  }

  @Mutation()
  async deleteOne${name}(
    @Args() args: NonNullableFields<DeleteOne${name}Args>,
    @Info() info: GraphQLResolveInfo
  ) {
    return this.prisma.${lowercase(name)}.delete(this.prismaSelect.getArgs(info, args));
  }

  @Mutation()
  async deleteMany${name}(@Args() args: DeleteMany${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(name)}.deleteMany(this.prismaSelect.getArgs(info, args));
  }
}
`;
}
