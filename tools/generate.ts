import { ZenGenerator } from './zen-generator';

async function main() {
  const generator = new ZenGenerator({
    palConfig: {
      schema: 'apps/api/prisma/schema.prisma',
      backend: {
        generator: 'sdl',
        output: 'apps/api/src/app/graphql/paljs',
        // Refer to (Pal.js GraphQL SDL Inputs Docs)[https://paljs.com/plugins/sdl-inputs]
        doNotUseFieldUpdateOperationsInput: true,
      },
    },
    apiOutPath: 'apps/api/src/app/graphql',
    caslSubjectsOutFile: 'apps/api/src/app/auth/casl/generated.ts',
    defaultFieldsOutFile: 'apps/api/src/app/prisma/default-fields.ts',
    frontend: {
      outPath: 'libs/graphql/src/lib',
    },
  });

  await generator.run();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
