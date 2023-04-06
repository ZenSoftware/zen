import { Meta, moduleMetadata } from '@storybook/angular';

import { AUTH_DECLARATIONS, AUTH_IMPORTS, AUTH_PROVIDERS } from '../test-deps';
import { ZenLoginFormComponent } from '../zen-login-form/zen-login-form.component';
import { ZenLoginPageComponent } from './zen-login-page.component';

export default {
  title: 'ZenLoginPageComponent',
  component: ZenLoginPageComponent,
  decorators: [
    moduleMetadata({
      imports: AUTH_IMPORTS,
      providers: AUTH_PROVIDERS,
      declarations: [...AUTH_DECLARATIONS, ZenLoginFormComponent],
    }),
  ],
} as Meta<ZenLoginPageComponent>;

export const Primary = {
  render: (args: ZenLoginPageComponent) => ({
    props: args,
  }),
  args: {},
};
