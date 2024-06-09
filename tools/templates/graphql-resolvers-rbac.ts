const lowercase = (name: string) => name.charAt(0).toLowerCase() + name.slice(1);

export function GraphQLResolversRBACTemplate(name: string, role: string) {
  return `import { UseGuards } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RolesGuard } from '@zen/nest-auth';
import { GraphQLResolveInfo } from 'graphql';

import { PrismaSelectService, PrismaService } from '../../../prisma';
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
@UseGuards(RolesGuard('Prisma'))
export class ${name}Resolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaSelect: PrismaSelectService
  ) {}

  @Query()
  async findUnique${name}(@Args() args: FindUnique${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(name)}.findUnique(this.prismaSelect.getArgs(args, info));
  }

  @Query()
  async findFirst${name}(@Args() args: FindFirst${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(name)}.findFirst(this.prismaSelect.getArgs(args, info));
  }

  @Query()
  async findMany${name}(@Args() args: FindMany${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(name)}.findMany(this.prismaSelect.getArgs(args, info));
  }

  @Query()
  async findMany${name}Count(@Args() args: FindMany${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(name)}.count(this.prismaSelect.getArgs(args, info) as any);
  }

  @Query()
  async aggregate${name}(@Args() args: Aggregate${name}Args) {
    return this.prisma.${lowercase(name)}.aggregate(args);
  }

  @Mutation()
  async createOne${name}(@Args() args: CreateOne${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(name)}.create(this.prismaSelect.getArgs(args, info));
  }

  @Mutation()
  async createMany${name}(@Args() args: CreateMany${name}Args) {
    return this.prisma.${lowercase(name)}.createMany(args);
  }

  @Mutation()
  async createMany${name}AndReturn(@Args() args: CreateMany${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(name)}.createManyAndReturn(this.prismaSelect.getArgs(args, info));
  }

  @Mutation()
  async updateOne${name}(@Args() args: UpdateOne${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(name)}.update(this.prismaSelect.getArgs(args, info));
  }

  @Mutation()
  async upsertOne${name}(@Args() args: UpsertOne${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(name)}.upsert(this.prismaSelect.getArgs(args, info));
  }

  @Mutation()
  async deleteOne${name}(@Args() args: DeleteOne${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(name)}.delete(this.prismaSelect.getArgs(args, info));
  }

  @Mutation()
  async deleteMany${name}(@Args() args: DeleteMany${name}Args) {
    return this.prisma.${lowercase(name)}.deleteMany(args);
  }

  @Mutation()
  async updateMany${name}(@Args() args: UpdateMany${name}Args, @Info() info: GraphQLResolveInfo) {
    return this.prisma.${lowercase(name)}.updateMany(this.prismaSelect.getArgs(args, info));
  }
}
`;
}
