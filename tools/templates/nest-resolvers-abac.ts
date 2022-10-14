export function NestResolversABACTemplate(name: string, federation?: string) {
  const federationPrefix = federation ? `${federation}_` : ``
  return `import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Info,
  Mutation,
  Parent,
  Query,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';

import { CaslSubject, GqlCaslGuard } from '../../auth';
import { PrismaSelectArgs } from '../../prisma';
import { IContext } from '../models';
import resolvers from '../paljs/${name}/resolvers';
import type {
  ${federationPrefix}Aggregate${name}Args,
  ${federationPrefix}CreateOne${name}Args,
  ${federationPrefix}DeleteMany${name}Args,
  ${federationPrefix}DeleteOne${name}Args,
  ${federationPrefix}FindFirst${name}Args,
  ${federationPrefix}FindMany${name}Args,
  ${federationPrefix}FindUnique${name}Args,
  ${federationPrefix}UpdateMany${name}Args,
  ${federationPrefix}UpdateOne${name}Args,
  ${federationPrefix}UpsertOne${name}Args,
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
  @ResolveReference()
  resolveReference(@Parent() reference, @Context() ctx: IContext) {
    return resolvers.${name}.__resolveReference(reference, ctx);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async ${federationPrefix}findUnique${name}(
    @Args() args: ${federationPrefix}FindUnique${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.${federationPrefix}findUnique${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async ${federationPrefix}findFirst${name}(
    @Args() args: ${federationPrefix}FindFirst${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.${federationPrefix}findFirst${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async ${federationPrefix}findMany${name}(
    @Args() args: ${federationPrefix}FindMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.${federationPrefix}findMany${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async ${federationPrefix}findMany${name}Count(
    @Args() args: ${federationPrefix}FindMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.${federationPrefix}findMany${name}Count(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async ${federationPrefix}aggregate${name}(
    @Args() args: ${federationPrefix}Aggregate${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.${federationPrefix}aggregate${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('create'))
  async ${federationPrefix}createOne${name}(
    @Args() args: ${federationPrefix}CreateOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.${federationPrefix}createOne${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('update'))
  async ${federationPrefix}updateOne${name}(
    @Args() args: ${federationPrefix}UpdateOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.${federationPrefix}updateOne${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('update'))
  async ${federationPrefix}updateMany${name}(
    @Args() args: ${federationPrefix}UpdateMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.${federationPrefix}updateMany${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('create', 'update'))
  async ${federationPrefix}upsertOne${name}(
    @Args() args: ${federationPrefix}UpsertOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.${federationPrefix}upsertOne${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('delete'))
  async ${federationPrefix}deleteOne${name}(
    @Args() args: ${federationPrefix}DeleteOne${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.${federationPrefix}deleteOne${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('delete'))
  async ${federationPrefix}deleteMany${name}(
    @Args() args: ${federationPrefix}DeleteMany${name}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.${federationPrefix}deleteMany${name}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }
}
`;
}
