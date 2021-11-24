module.exports = {
  client: {
    service: {
      name: 'zen',
      url: 'http://localhost:7080/graphql',
    },

    includes: ['apps/portal/src/**/*.ts', 'libs/**/*.ts'],
    excludes: [
      'libs/graphql/src/lib/apollo-angular.ts',
      '**/*.test.ts',
      '**/*.spec.ts',
      '**/*.d.ts',
    ],
  },
};
