export function NestResolversABACTemplate(name: string) {
  return `import { UseGuards } from '@nestjs/common';
import { Args, Context, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';

import { CaslSubject, GqlCaslGuard } from '../../auth';
import { PrismaSelectArgs } from '../../prisma';
import { IContext } from '../models';
import resolvers from '../paljs/${name}/resolvers';
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
@CaslSubject('${name}')
export class ${name}Resolver {
  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findUnique${name}(
    @Args() args: FindUnique${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.findUnique${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findFirst${name}(
    @Args() args: FindFirst${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.findFirst${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findMany${name}(
    @Args() args: FindMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.findMany${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findMany${name}Count(
    @Args() args: FindMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.findMany${name}Count(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async aggregate${name}(
    @Args() args: Aggregate${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.aggregate${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('create'))
  async createOne${name}(
    @Args() args: CreateOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.createOne${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('update'))
  async updateOne${name}(
    @Args() args: UpdateOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.updateOne${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('update'))
  async updateMany${name}(
    @Args() args: UpdateMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.updateMany${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('create', 'update'))
  async upsertOne${name}(
    @Args() args: UpsertOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.upsertOne${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('delete'))
  async deleteOne${name}(
    @Args() args: DeleteOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.deleteOne${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('delete'))
  async deleteMany${name}(
    @Args() args: DeleteMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.deleteMany${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }
}
`;
}
