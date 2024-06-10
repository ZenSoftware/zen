import { Meta } from '@storybook/angular';

import { ZenEmailInputComponent } from './zen-email-input.component';

export default {
  title: 'ZenEmailInputComponent',
  component: ZenEmailInputComponent,
} as Meta<ZenEmailInputComponent>;

export const Primary = {
  render: (args: ZenEmailInputComponent) => ({
    props: args,
  }),
  args: {
    required: false,
    customErrorMessage: '',
  },
};
