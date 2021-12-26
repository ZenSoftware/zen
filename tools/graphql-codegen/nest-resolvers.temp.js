module.exports = (prismaName, querySource, mutationSource) => {
  return `import { UseGuards } from '@nestjs/common';
import { Args, Context, Info, Mutation, Parent, Query, Resolver, ResolveField } from '@nestjs/graphql';
import gql from 'graphql-tag';

import { GqlGuard, GqlUser, RequestUser, Roles } from '../../auth';
import resolvers from '../generated/${prismaName}/resolvers';
import { IContext } from '../models';
import { PrismaSelectArgs } from '../prisma-select-args';

export const ${prismaName}TypeDef = null;
// export const ${prismaName}TypeDef = gql\`
//   extend type Query {
//     sample${prismaName}Query: ${prismaName}!
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
${querySource}${mutationSource}
}
`;
};
