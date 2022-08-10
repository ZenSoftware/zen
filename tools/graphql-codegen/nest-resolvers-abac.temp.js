module.exports = prismaName => {
  return `import { UseGuards } from '@nestjs/common';
import { Args, Context, Info, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';

import { CaslSubject, GqlCaslGuard } from '../../auth';
import { PrismaSelectArgs } from '../../prisma';
import resolvers from '../generated/${prismaName}/resolvers';

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
  async findUnique${prismaName}(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findUnique${prismaName}(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findFirst${prismaName}(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findFirst${prismaName}(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findMany${prismaName}(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findMany${prismaName}(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async findMany${prismaName}Count(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.findMany${prismaName}Count(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async aggregate${prismaName}(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Query.aggregate${prismaName}(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('create'))
  async createOne${prismaName}(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.createOne${prismaName}(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('update'))
  async updateOne${prismaName}(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.updateOne${prismaName}(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('update'))
  async updateMany${prismaName}(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.updateMany${prismaName}(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('create', 'update'))
  async upsertOne${prismaName}(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.upsertOne${prismaName}(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('delete'))
  async deleteOne${prismaName}(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.deleteOne${prismaName}(parent, PrismaSelectArgs(info, args), ctx, info);
  }

  @Mutation()
  @UseGuards(GqlCaslGuard('delete'))
  async deleteMany${prismaName}(@Parent() parent, @Info() info, @Args() args, @Context() ctx) {
    return resolvers.Mutation.deleteMany${prismaName}(parent, PrismaSelectArgs(info, args), ctx, info);
  }
}
`;
};
