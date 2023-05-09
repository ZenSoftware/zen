import { Meta, moduleMetadata } from '@storybook/angular';
import { AuthPasswordResetConfirmationGQL } from '@zen/graphql';

import { ZenPasswordResetConfirmationComponent } from './zen-password-reset-confirmation.component';

export default {
  title: 'ZenPasswordResetConfirmationComponent',
  component: ZenPasswordResetConfirmationComponent,
  decorators: [
    moduleMetadata({
      providers: [AuthPasswordResetConfirmationGQL],
    }),
  ],
} as Meta<ZenPasswordResetConfirmationComponent>;

export const Primary = {
  render: (args: ZenPasswordResetConfirmationComponent) => ({
    props: args,
  }),
  args: {},
};
