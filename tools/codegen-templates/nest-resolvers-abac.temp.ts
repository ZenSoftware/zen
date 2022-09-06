export function NestResolversABACTemplate(prismaName: string) {
  return `import { UseGuards } from '@nestjs/common';
import { Args, Context, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';

import { CaslSubject, GqlCaslGuard } from '../../auth';
import { PrismaSelectArgs } from '../../prisma';
import resolvers from '../generated/${prismaName}/resolvers';
import { IContext } from '../models';
import {
  Aggregate${prismaName}Args,
  CreateOne${prismaName}Args,
  DeleteMany${prismaName}Args,
  DeleteOne${prismaName}Args,
  FindFirst${prismaName}Args,
  FindMany${prismaName}Args,
  FindUnique${prismaName}Args,
  UpdateMany${prismaName}Args,
  UpdateOne${prismaName}Args,
  UpsertOne${prismaName}Args,
} from '../resolversTypes';

export const typeDefs = null;
// export const typeDefs = gql\`
//   extend type Query {
//     sample${prismaName}Query: ${prismaName}
//   }
//   extend type Mutation {
//     sample${prismaName}Mutation(args: Int!): Boolean
//   }
//   extend type ${prismaName} {
//     sample${prismaName}Field: String
//   }
// \`;

@Resolver('${prismaName}')
@CaslSubject('${prismaName}')
export class ${prismaName}Resolver {
  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findUnique${prismaName}(
    @Args() args: FindUnique${prismaName}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.findUnique${prismaName}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findFirst${prismaName}(
    @Args() args: FindFirst${prismaName}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.findFirst${prismaName}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findMany${prismaName}(
    @Args() args: FindMany${prismaName}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.findMany${prismaName}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findMany${prismaName}Count(
    @Args() args: FindMany${prismaName}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.findMany${prismaName}Count(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async aggregate${prismaName}(
    @Args() args: Aggregate${prismaName}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Query.aggregate${prismaName}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('create'))
  async createOne${prismaName}(
    @Args() args: CreateOne${prismaName}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.createOne${prismaName}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('update'))
  async updateOne${prismaName}(
    @Args() args: UpdateOne${prismaName}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.updateOne${prismaName}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('update'))
  async updateMany${prismaName}(
    @Args() args: UpdateMany${prismaName}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.updateMany${prismaName}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('create', 'update'))
  async upsertOne${prismaName}(
    @Args() args: UpsertOne${prismaName}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.upsertOne${prismaName}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('delete'))
  async deleteOne${prismaName}(
    @Args() args: DeleteOne${prismaName}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.deleteOne${prismaName}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('delete'))
  async deleteMany${prismaName}(
    @Args() args: DeleteMany${prismaName}Args,
    @Info() info: GraphQLResolveInfo,
    @Context() ctx: IContext
  ) {
    return resolvers.Mutation.deleteMany${prismaName}(undefined, PrismaSelectArgs(info, args), ctx, info);
  }
}
`;
}
