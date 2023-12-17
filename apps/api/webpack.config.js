const { composePlugins, withNx } = require('@nx/webpack');
const path = require('path');

module.exports = composePlugins(withNx(), (config, { options, context }) => {
  /**
   * Temporary fix for [@nx/nest VSCode breakpoints no longer working](https://github.com/nrwl/nx/issues/14708#issuecomment-1457996600)
   */
  config.output.devtoolModuleFilenameTemplate = function (info) {
    const rel = path.relative(process.cwd(), info.absoluteResourcePath);
    return `webpack:///./${rel}`;
  };

  config.devtool = 'source-map';

  return config;
});
