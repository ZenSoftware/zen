const { composePlugins, withNx } = require('@nrwl/webpack');
const path = require('path');

module.exports = composePlugins(withNx(), (config, { options, context }) => {
  /**
   * Temporary fix for [@nrwl/nest VSCode breakpoints no longer working](https://github.com/nrwl/nx/issues/14708#issuecomment-1457996600)
   */
  config.output.devtoolModuleFilenameTemplate = function (info) {
    const rel = path.relative(process.cwd(), info.absoluteResourcePath);
    return `webpack:///./${rel}`;
  };

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
            return false;
          }

          return true;
        },
      },
    },
  ];

  return config;
});
