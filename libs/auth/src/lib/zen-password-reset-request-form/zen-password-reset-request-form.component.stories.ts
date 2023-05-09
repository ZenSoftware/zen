import { Meta, moduleMetadata } from '@storybook/angular';
import { AuthPasswordResetRequestQueryGQL } from '@zen/graphql';

import { ZenPasswordResetRequestFormComponent } from './zen-password-reset-request-form.component';

export default {
  title: 'ZenPasswordResetRequestFormComponent',
  component: ZenPasswordResetRequestFormComponent,
  decorators: [
    moduleMetadata({
      providers: [AuthPasswordResetRequestQueryGQL],
    }),
  ],
} as Meta<ZenPasswordResetRequestFormComponent>;

export const Primary = {
  render: (args: ZenPasswordResetRequestFormComponent) => ({
    props: args,
  }),
  args: {},
};
