export function NestResolversIndexTemplate(names: string[]) {
  let indexSource = `import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

import PALJS_TYPE_DEFS from '../paljs/typeDefs';
import { typeDefs as GlobalTypeDefs } from '../global-schema.gql';\n`;

  // Construct the "resolvers" directory's "index.ts"
  indexSource += names
    .map(n => `import { ${n}Resolver, typeDefs as ${n}TypeDefs } from './${n}';`)
    .reduce((prev, curr, i, []) => prev + '\n' + curr);

  // Create an ES6 export to automate the importing of all Nest resolvers in bulk
  const bulkExportString = names
    .map(n => `${n}Resolver`)
    .toString()
    .replace(/,/g, ',\n  ');
  indexSource += `\n\nexport const NEST_RESOLVERS = [\n  ${bulkExportString}\n];`;

  const bulkTypeDefExportString = names
    .map(n => `${n}TypeDefs`)
    .toString()
    .replace(/,/g, ',\n  ');
  indexSource += `\n\nexport const NEST_TYPE_DEFS = [\n  ${bulkTypeDefExportString}\n].filter(x => x);\n\n`;

  indexSource += `export const ALL_TYPE_DEFS = mergeTypeDefs([GlobalTypeDefs, PALJS_TYPE_DEFS, ...NEST_TYPE_DEFS]);
export const GRAPHQL_SCHEMA = makeExecutableSchema({ typeDefs: ALL_TYPE_DEFS });
`;

  return indexSource;
}
