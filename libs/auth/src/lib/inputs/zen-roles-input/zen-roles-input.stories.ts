import { Meta } from '@storybook/angular';

import { ZenRolesInputComponent } from './zen-roles-input.component';

export default {
  title: 'ZenRolesInputComponent',
  component: ZenRolesInputComponent,
} as Meta<ZenRolesInputComponent>;

export const Primary = {
  render: (args: ZenRolesInputComponent) => ({
    props: args,
  }),
};
