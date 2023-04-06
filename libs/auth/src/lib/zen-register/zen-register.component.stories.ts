import { Meta, moduleMetadata } from '@storybook/angular';
import { AuthRegisterGQL } from '@zen/graphql';

import { AUTH_DECLARATIONS, AUTH_IMPORTS, AUTH_PROVIDERS } from '../test-deps';
import { ZenRegisterFormComponent } from '../zen-register-form/zen-register-form.component';
import { ZenRegisterComponent } from './zen-register.component';

export default {
  title: 'ZenRegisterComponent',
  component: ZenRegisterComponent,
  decorators: [
    moduleMetadata({
      imports: AUTH_IMPORTS,
      providers: [...AUTH_PROVIDERS, AuthRegisterGQL],
      declarations: [...AUTH_DECLARATIONS, ZenRegisterFormComponent],
    }),
  ],
} as Meta<ZenRegisterComponent>;

export const Primary = {
  render: (args: ZenRegisterComponent) => ({
    props: args,
  }),
  args: {},
};
