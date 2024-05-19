import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { CodegenConfig, generate } from '@graphql-codegen/cli';

import { GenerateGqlExecutorSchema } from './schema';

export default async function runExecutor(options: GenerateGqlExecutorSchema) {
  console.log(`------------------------ @graphql-codegen/cli ------------------------`);

  const TYPES_PATH = path.join(options.outputPath, 'Types.cs');
  const OPERATIONS_PATH = path.join(options.outputPath, 'Operations.cs');

  const config: CodegenConfig = {
    overwrite: options.overwrite,
    schema: options.schema,
    documents: options.documents,
    config: {
      namespaceName: options.namespaceName,
    },
    generates: {
      [OPERATIONS_PATH]: {
        plugins: ['c-sharp-operations'],
      },
      [TYPES_PATH]: {
        plugins: ['c-sharp'],
        config: {
          strictScalars: true,
          scalars: options.scalars,
        },
      },
    },
  };

  // Generate C# GraphQL types
  await generate(config);

  // Preppend autogenerated comment
  let typesSource = (await readFile(TYPES_PATH)).toString();
  typesSource = '// <autogenerated />\n' + typesSource;
  await writeFile(TYPES_PATH, typesSource);

  let operationsSource = (await readFile(OPERATIONS_PATH)).toString();
  operationsSource = '// <autogenerated />\n' + operationsSource;
  await writeFile(OPERATIONS_PATH, operationsSource);

  return {
    success: true,
  };
}
