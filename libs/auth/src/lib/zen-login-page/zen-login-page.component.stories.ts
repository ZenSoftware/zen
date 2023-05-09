import { Meta } from '@storybook/angular';

import { ZenLoginPageComponent } from './zen-login-page.component';

export default {
  title: 'ZenLoginPageComponent',
  component: ZenLoginPageComponent,
} as Meta<ZenLoginPageComponent>;

export const Primary = {
  render: (args: ZenLoginPageComponent) => ({
    props: args,
  }),
  args: {},
};
