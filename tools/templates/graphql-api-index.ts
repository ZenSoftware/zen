export function GraphQLApiIndexTemplate(names: string[]) {
  let indexSource = `// This file is generated automatically. Do not edit it manually.
import { mergeTypeDefs } from '@graphql-tools/merge';
import { DocumentNode } from 'graphql';

import { typeDefs as GlobalTypeDefs } from '../global-schema.gql';
import PALJS_TYPE_DEFS from '../paljs/typeDefs';

import { PRISMA_RESOLVERS, PRISMA_TYPE_DEFS } from './prisma';\n`;

  // Construct the "resolvers" directory's "index.ts"
  indexSource += names
    .map(n => `import { ${n}Resolver, typeDefs as ${n}TypeDefs } from './${n}';`)
    .reduce((prev, curr, i, []) => prev + '\n' + curr);

  // Create an ES6 export to automate the importing of all Nest resolvers in bulk
  const bulkExportString = names
    .map(n => `${n}Resolver`)
    .toString()
    .replace(/,/g, ',\n  ');
  indexSource += `\n\nconst API_RESOLVERS = [\n  ${bulkExportString}\n];`;

  const bulkTypeDefExportString = names
    .map(n => `${n}TypeDefs`)
    .toString()
    .replace(/,/g, ',\n  ');
  indexSource += `\n\nconst API_TYPE_DEFS = [\n  ${bulkTypeDefExportString}\n].filter(x => x) as DocumentNode[];\n\n`;

  indexSource += `export const ALL_RESOLVERS = [...PRISMA_RESOLVERS, ...API_RESOLVERS];

export const ALL_TYPE_DEFS = mergeTypeDefs([
  GlobalTypeDefs,
  PALJS_TYPE_DEFS,
  ...PRISMA_TYPE_DEFS,
  ...API_TYPE_DEFS,
]);\n`;

  return indexSource;
}
