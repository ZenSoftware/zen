module.exports = {
  client: {
    service: {
      name: 'zen',
      url: 'http://localhost:7080/graphql',
    },

    includes: ['apps/portal/src/app/**/*.gql.ts', 'libs/**/*.gql.ts'],
  },
};
