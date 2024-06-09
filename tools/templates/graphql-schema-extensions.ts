export function GraphQLSchemaExtensionsTemplate(names: string[]) {
  let result = `/** This file is code generated */
import gql from 'graphql-tag';

export default gql\`
  extend type Mutation {\n`;

  for (const name of names) {
    result += `    createMany${name}(data: [${name}CreateManyInput!]!): BatchPayload`;
    result += `    createMany${name}AndReturn(data: [${name}CreateManyInput!]!): [${name}!]!`;
  }

  result += `  }
\`;
`;

  return result;
}
