module.exports = {
  client: {
    service: {
      name: 'zen-unity',
      url: 'http://localhost:7080/graphql',
    },
    includes: ['Assets/Scripts/GraphQL/**/*.graphql'],
    excludes: ['**/*.test.ts', '**/*.spec.ts', '**/*.stories.ts', '**/*.d.ts'],
  },
};
