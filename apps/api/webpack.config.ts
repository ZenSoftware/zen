import path from 'node:path';

import { NxComposableWebpackPlugin, composePlugins, withNx } from '@nx/webpack';

const withFixedSourceMapPaths: () => NxComposableWebpackPlugin = () => config => {
  config.output!.devtoolModuleFilenameTemplate = function (info) {
    const rel = path.relative(process.cwd(), info.absoluteResourcePath);
    return `webpack:///./${rel}`;
  };

  config.devtool = 'source-map';

  return config;
};

export default composePlugins(withNx(), withFixedSourceMapPaths());
