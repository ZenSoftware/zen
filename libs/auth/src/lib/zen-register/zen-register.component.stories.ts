import { Meta, moduleMetadata } from '@storybook/angular';
import { AuthRegisterGQL } from '@zen/graphql';

import { ZenRegisterComponent } from './zen-register.component';

export default {
  title: 'ZenRegisterComponent',
  component: ZenRegisterComponent,
  decorators: [
    moduleMetadata({
      providers: [AuthRegisterGQL],
    }),
  ],
} as Meta<ZenRegisterComponent>;

export const Primary = {
  render: (args: ZenRegisterComponent) => ({
    props: args,
  }),
  args: {},
};
