import { Meta } from '@storybook/angular';

import { ZenLoginComponent } from './zen-login.component';

export default {
  title: 'ZenLoginComponent',
  component: ZenLoginComponent,
} as Meta<ZenLoginComponent>;

export const Primary = {
  render: (args: ZenLoginComponent) => ({
    props: args,
  }),
  args: {},
};
