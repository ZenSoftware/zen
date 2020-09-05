module.exports = (prismaName, querySource, mutationSource) => {
  return `import { Args, Context, Info, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import gql from 'graphql-tag';

import { PrismaSelectArgs } from '../prisma-select-args';
import resolvers from '../prisma/${prismaName}/resolvers';

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
export class ${prismaName}Resolver {
${querySource}${mutationSource}
}
`;
};
