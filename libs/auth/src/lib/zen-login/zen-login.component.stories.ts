import { Meta, moduleMetadata } from '@storybook/angular';

import { AUTH_DECLARATIONS, AUTH_IMPORTS, AUTH_PROVIDERS } from '../test-deps';
import { ZenLoginFormComponent } from '../zen-login-form/zen-login-form.component';
import { ZenLoginComponent } from './zen-login.component';

export default {
  title: 'ZenLoginComponent',
  component: ZenLoginComponent,
  decorators: [
    moduleMetadata({
      imports: AUTH_IMPORTS,
      providers: AUTH_PROVIDERS,
      declarations: [...AUTH_DECLARATIONS, ZenLoginFormComponent],
    }),
  ],
} as Meta<ZenLoginComponent>;

export const Primary = {
  render: (args: ZenLoginComponent) => ({
    props: args,
  }),
  args: {},
};
