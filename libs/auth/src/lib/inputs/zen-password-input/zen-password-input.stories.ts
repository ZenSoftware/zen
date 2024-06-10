import { Meta } from '@storybook/angular';

import { ZenPasswordInputComponent } from './zen-password-input.component';

export default {
  title: 'ZenPasswordInputComponent',
  component: ZenPasswordInputComponent,
} as Meta<ZenPasswordInputComponent>;

export const Primary = {
  render: (args: ZenPasswordInputComponent) => ({
    props: args,
  }),
  args: {
    required: false,
    customErrorMessage: '',
  },
};
