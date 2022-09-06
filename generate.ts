import * as path from 'path';

import { ZenGenerator } from './tools/zen-generator';

async function main() {
  const generator = new ZenGenerator({
    palConfig: require('./pal.js'),
    apiOutPath: path.join(__dirname, 'apps/api/src/app/graphql'),
    caslOutFile: path.join(__dirname, 'apps/api/src/app/auth/casl/generated.ts'),
    frontend: {
      prismaOutPath: path.join(__dirname, 'libs/graphql/src/lib/prisma'),
      fieldsOutPath: path.join(__dirname, 'libs/graphql/src/lib/fields'),
    },
  });

  await generator.generate();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
