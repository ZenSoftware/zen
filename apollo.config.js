module.exports = {
  client: {
    service: {
      name: 'zen',
      url: 'http://localhost:7080/graphql',
    },

    includes: [
      'apps/portal/src/**/*.ts',
      'apps/portal/src/**/*.graphql',
      'libs/**/*.ts',
      'libs/**/*.graphql',
    ],
    excludes: [
      'libs/graphql/src/lib/apollo-angular.ts',
      '**/*.test.ts',
      '**/*.spec.ts',
      '**/*.stories.ts',
      '**/*.d.ts',
    ],
  },
};
