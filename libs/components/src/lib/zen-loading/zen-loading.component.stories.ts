import { Meta } from '@storybook/angular';

import { ZenLoadingComponent } from './zen-loading.component';

export default {
  title: 'ZenLoadingComponent',
  component: ZenLoadingComponent,
} as Meta<ZenLoadingComponent>;

export const Primary = {
  render: (args: ZenLoadingComponent) => ({
    props: args,
  }),
  args: {
    backdrop: true,
  },
};
