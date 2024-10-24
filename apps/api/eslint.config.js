const baseConfig = require('../../eslint.config.js');

module.exports = [
  ...baseConfig,
  {
    ignores: ['src/app/prisma/generated', 'src/app/graphql/resolversTypes.ts'],
  },
];
