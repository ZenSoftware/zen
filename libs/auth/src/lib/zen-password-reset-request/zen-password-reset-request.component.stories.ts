import { Meta, moduleMetadata } from '@storybook/angular';
import { AuthPasswordResetRequestQueryGQL } from '@zen/graphql';

import { ZenPasswordResetRequestComponent } from './zen-password-reset-request.component';

export default {
  title: 'ZenPasswordResetRequestComponent',
  component: ZenPasswordResetRequestComponent,
  decorators: [
    moduleMetadata({
      providers: [AuthPasswordResetRequestQueryGQL],
    }),
  ],
} as Meta<ZenPasswordResetRequestComponent>;

export const Primary = {
  render: (args: ZenPasswordResetRequestComponent) => ({
    props: args,
  }),
  args: {},
};
