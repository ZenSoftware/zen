module.exports = {
  client: {
    service: {
      name: 'zen',
      localSchemaFile: 'schema.graphql',
    },

    includes: ['apps/portal/src/**/*.gql.ts', 'libs/**/*.gql.ts'],
  },
};
