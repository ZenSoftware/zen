module.exports = {
  backend: {
    generator: 'sdl',
    onDelete: true,
    excludeQueriesAndMutations: ['aggregate'],
    output: 'apps/api/src/app/graphql/prisma',
  },
};
