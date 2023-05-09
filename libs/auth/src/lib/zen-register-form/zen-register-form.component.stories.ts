import { Meta, moduleMetadata } from '@storybook/angular';
import { AuthRegisterGQL } from '@zen/graphql';

import { ZenRegisterFormComponent } from './zen-register-form.component';

export default {
  title: 'ZenRegisterFormComponent',
  component: ZenRegisterFormComponent,
  decorators: [
    moduleMetadata({
      providers: [AuthRegisterGQL],
    }),
  ],
} as Meta<ZenRegisterFormComponent>;

export const Primary = {
  render: (args: ZenRegisterFormComponent) => ({
    props: args,
  }),
  args: {},
};
