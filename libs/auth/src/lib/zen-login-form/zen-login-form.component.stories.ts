import { Meta } from '@storybook/angular';

import { ZenLoginFormComponent } from './zen-login-form.component';

export default {
  title: 'ZenLoginFormComponent',
  component: ZenLoginFormComponent,
} as Meta<ZenLoginFormComponent>;

export const Primary = {
  render: (args: ZenLoginFormComponent) => ({
    props: args,
  }),
  args: {
    doneMessage: 'Redirecting...',
    doneMessageVisible: true,
  },
};
