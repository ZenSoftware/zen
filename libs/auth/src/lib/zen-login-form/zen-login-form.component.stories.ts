import { Meta, moduleMetadata } from '@storybook/angular';

import { AUTH_DECLARATIONS, AUTH_IMPORTS, AUTH_PROVIDERS } from '../test-deps';
import { ZenLoginFormComponent } from './zen-login-form.component';

export default {
  title: 'ZenLoginFormComponent',
  component: ZenLoginFormComponent,
  decorators: [
    moduleMetadata({
      imports: AUTH_IMPORTS,
      providers: AUTH_PROVIDERS,
      declarations: AUTH_DECLARATIONS,
    }),
  ],
} as Meta<ZenLoginFormComponent>;

export const Primary = {
  render: (args: ZenLoginFormComponent) => ({
    props: args,
  }),
  args: {
    doneMessage: 'Redirecting...',
    doneMessageVisible: true,
  },
};
