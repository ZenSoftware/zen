import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [],
  framework: {
    name: '@storybook/angular',
    options: {
      builder: {
        viteConfigPath: 'libs/components/vite.config.mts',
      },
    },
  },
  staticDirs: [{ from: '../../../apps/portal/src/assets', to: '/assets' }],
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
