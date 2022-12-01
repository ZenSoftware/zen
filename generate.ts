import * as path from 'path';

import { ZenGenerator } from './tools/zen-generator';

async function main() {
  const generator = new ZenGenerator({
    palConfig: require('./pal.config.js'),
    apiOutPath: path.join(__dirname, 'apps/api/src/app/graphql'),
    caslOutFile: path.join(__dirname, 'apps/api/src/app/auth/casl/generated.ts'),
    frontend: {
      outPath: path.join(__dirname, 'libs/graphql/src/lib'),
    },
  });

  await generator.run();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
