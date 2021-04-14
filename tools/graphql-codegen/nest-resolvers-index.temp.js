module.exports = dataTypeNames => {
  let indexSource = `import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from 'graphql-tools';

import PRISMA_TYPE_DEFS from '../prisma/typeDefs';\n`;

  // Construct the "resolvers" directory's "index.ts"
  indexSource += dataTypeNames
    .map(n => `import { ${n}Resolver, ${n}TypeDef } from './${n}';`)
    .reduce((prev, curr, i, []) => prev + '\n' + curr);

  // Create an ES6 export to automate the importing of all Nest resolvers in bulk
  const bulkExportString = dataTypeNames
    .map(n => `${n}Resolver`)
    .toString()
    .replace(/,/g, ',\n  ');
  indexSource += `\n\nexport const NEST_RESOLVERS = [\n  ${bulkExportString}\n];`;

  const bulkTypeDefExportString = dataTypeNames
    .map(n => `${n}TypeDef`)
    .toString()
    .replace(/,/g, ',\n  ');
  indexSource += `\n\nexport const NEST_TYPE_DEFS = [\n  ${bulkTypeDefExportString}\n].filter(x => x);\n\n`;

  indexSource += `export const ALL_TYPE_DEFS = mergeTypeDefs(['scalar Upload', PRISMA_TYPE_DEFS, ...NEST_TYPE_DEFS]);
export const GRAPHQL_SCHEMA = makeExecutableSchema({ typeDefs: ALL_TYPE_DEFS });
export const PRISMA_SCHEMA = makeExecutableSchema({ typeDefs: PRISMA_TYPE_DEFS });\n`;

  return indexSource;
};
