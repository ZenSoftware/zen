import { Meta, moduleMetadata } from '@storybook/angular';
import { AuthPasswordResetRequestQueryGQL } from '@zen/graphql';

import { ZenPasswordResetRequestPageComponent } from './zen-password-reset-request-page.component';

export default {
  title: 'ZenPasswordResetRequestPageComponent',
  component: ZenPasswordResetRequestPageComponent,
  decorators: [
    moduleMetadata({
      providers: [AuthPasswordResetRequestQueryGQL],
    }),
  ],
} as Meta<ZenPasswordResetRequestPageComponent>;

export const Primary = {
  render: (args: ZenPasswordResetRequestPageComponent) => ({
    props: args,
  }),
  args: {},
};
