import { Meta, moduleMetadata } from '@storybook/angular';
import { AuthRegisterGQL } from '@zen/graphql';

import { ZenRegisterPageComponent } from './zen-register-page.component';

export default {
  title: 'ZenRegisterPageComponent',
  component: ZenRegisterPageComponent,
  decorators: [
    moduleMetadata({
      providers: [AuthRegisterGQL],
    }),
  ],
} as Meta<ZenRegisterPageComponent>;

export const Primary = {
  render: (args: ZenRegisterPageComponent) => ({
    props: args,
  }),
  args: {},
};
