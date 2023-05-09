import { Meta, moduleMetadata } from '@storybook/angular';
import { AuthPasswordChangeGQL } from '@zen/graphql';

import { ZenPasswordChangeComponent } from './zen-password-change.component';

export default {
  title: 'ZenPasswordChangeComponent',
  component: ZenPasswordChangeComponent,
  decorators: [
    moduleMetadata({
      providers: [AuthPasswordChangeGQL],
    }),
  ],
} as Meta<ZenPasswordChangeComponent>;

export const Primary = {
  render: (args: ZenPasswordChangeComponent) => ({
    props: args,
  }),
  args: {},
};
