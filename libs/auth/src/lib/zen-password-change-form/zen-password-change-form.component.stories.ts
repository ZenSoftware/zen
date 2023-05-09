import { Meta, moduleMetadata } from '@storybook/angular';
import { AuthPasswordChangeGQL } from '@zen/graphql';

import { ZenPasswordChangeFormComponent } from './zen-password-change-form.component';

export default {
  title: 'ZenPasswordChangeFormComponent',
  component: ZenPasswordChangeFormComponent,
  decorators: [
    moduleMetadata({
      providers: [AuthPasswordChangeGQL],
    }),
  ],
} as Meta<ZenPasswordChangeFormComponent>;

export const Primary = {
  render: (args: ZenPasswordChangeFormComponent) => ({
    props: args,
  }),
  args: {},
};
