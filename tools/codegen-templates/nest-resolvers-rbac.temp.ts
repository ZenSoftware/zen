export function NestResolversRBACTemplate(
  /** @todo finish implementation */
  prismaName: string
) {
  return `import { UseGuards } from '@nestjs/common';
import { Args, Context, Info, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';

import { GqlGuard, Roles } from '../../auth';
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
@UseGuards(GqlGuard)
@Roles('Super')
export class ${prismaName}Resolver {

// ... finish codegen

}
`;
}
