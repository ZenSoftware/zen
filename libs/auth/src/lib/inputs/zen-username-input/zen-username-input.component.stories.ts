import { Meta } from '@storybook/angular';

import { ZenUsernameInputComponent } from './zen-username-input.component';

export default {
  title: 'ZenUsernameInputComponent',
  component: ZenUsernameInputComponent,
} as Meta<ZenUsernameInputComponent>;

export const Primary = {
  render: (args: ZenUsernameInputComponent) => ({
    props: args,
  }),
  args: {
    required: false,
    customErrorMessage: '',
  },
};
