export function GraphQLPrismaIndexTemplate(names: string[]) {
  let indexSource = `// This file is generated automatically. Do not edit it manually.\n\n`;

  // Construct the "resolvers" directory's "index.ts"
  indexSource += names
    .map(n => `import { ${n}Resolver, typeDefs as ${n}TypeDefs } from './${n}';`)
    .reduce((prev, curr, i, []) => prev + '\n' + curr);

  // Create an ES6 export to automate the importing of all Nest resolvers in bulk
  const bulkExportString = names
    .map(n => `${n}Resolver`)
    .toString()
    .replace(/,/g, ',\n  ');
  indexSource += `\n\nexport const PRISMA_RESOLVERS = [\n  ${bulkExportString}\n];`;

  const bulkTypeDefExportString = names
    .map(n => `${n}TypeDefs`)
    .toString()
    .replace(/,/g, ',\n  ');
  indexSource += `\n\nexport const PRISMA_TYPE_DEFS: any[] = [\n  ${bulkTypeDefExportString}\n].filter(x => x)\n\n`;

  return indexSource;
}
