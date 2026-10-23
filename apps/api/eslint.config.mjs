import baseConfig from '../../eslint.config.mjs';

export default [
  {
    ignores: ['src/app/prisma/generated', 'src/app/graphql/resolversTypes.ts'],
  },
  ...baseConfig,
];
