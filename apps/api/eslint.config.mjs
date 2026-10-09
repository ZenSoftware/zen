import { globalIgnores } from 'eslint/config';

import baseConfig from '../../eslint.config.mjs';

export default [
  globalIgnores(['src/app/prisma/generated', 'src/app/graphql/resolversTypes.ts']),
  ...baseConfig,
];
