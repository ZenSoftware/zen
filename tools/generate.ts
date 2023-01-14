import { ZenGenerator } from './zen-generator';

async function main() {
  const generator = new ZenGenerator({
    palConfig: {
      schema: 'apps/api/schema.prisma',
      backend: {
        generator: 'sdl',
        output: 'apps/api/src/app/graphql/paljs',
      },
    },
    apiOutPath: 'apps/api/src/app/graphql',
    caslOutFile: 'apps/api/src/app/auth/casl/generated.ts',
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
