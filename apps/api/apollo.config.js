module.exports = {
  client: {
    service: {
      name: 'prisma',
      localSchemaFile: 'apps/api/src/app/graphql/prisma/schema.graphql',
    },

    includes: ['src/app/graphql/resolvers/**/*.ts'],
  },
};
