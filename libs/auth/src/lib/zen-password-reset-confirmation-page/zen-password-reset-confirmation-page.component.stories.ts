import { Meta, moduleMetadata } from '@storybook/angular';
import { AuthPasswordResetConfirmationGQL } from '@zen/graphql';

import { ZenPasswordResetConfirmationPageComponent } from './zen-password-reset-confirmation-page.component';

export default {
  title: 'ZenPasswordResetConfirmationPageComponent',
  component: ZenPasswordResetConfirmationPageComponent,
  decorators: [
    moduleMetadata({
      providers: [AuthPasswordResetConfirmationGQL],
    }),
  ],
} as Meta<ZenPasswordResetConfirmationPageComponent>;

export const Primary = {
  render: (args: ZenPasswordResetConfirmationPageComponent) => ({
    props: args,
  }),
  args: {},
};
