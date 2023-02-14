const { composePlugins, withNx } = require('@nrwl/webpack');

module.exports = composePlugins(withNx(), (config, { options, context }) => {
  /**
   * The generated Prisma client does not produce source maps, so we need to
   * filter out the source map loader for the generated client.
   */
  const sourceMapLoaderRule = config.module.rules.find(
    c => c.loader && c.loader.includes('source-map-loader')
  );

  delete sourceMapLoaderRule.loader;

  sourceMapLoaderRule.use = [
    {
      loader: 'source-map-loader',
      options: {
        filterSourceMappingUrl: (url, resourcePath) => {
          if (/generated/.test(resourcePath)) {
            return 'skip';
          }

          return true;
        },
      },
    },
  ];

  return config;
});
