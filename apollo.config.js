module.exports = {
  client: {
    service: {
      name: 'zen',
      url: 'http://localhost:7080/graphql',
    },

    includes: ['apps/portal/src/**/*.gql.ts', 'libs/**/*.gql.ts'],
    excludes: ['libs/graphql/src/lib/apollo-angular.ts'],
  },
};
