import { Meta, moduleMetadata } from '@storybook/angular';
import { AuthPasswordResetConfirmationGQL } from '@zen/graphql';

import { ZenPasswordResetConfirmationFormComponent } from './zen-password-reset-confirmation-form.component';

export default {
  title: 'ZenPasswordResetConfirmationFormComponent',
  component: ZenPasswordResetConfirmationFormComponent,
  decorators: [
    moduleMetadata({
      providers: [AuthPasswordResetConfirmationGQL],
    }),
  ],
} as Meta<ZenPasswordResetConfirmationFormComponent>;

export const Primary = {
  render: (args: ZenPasswordResetConfirmationFormComponent) => ({
    props: args,
  }),
  args: {
    redirectTime: 5,
  },
};
