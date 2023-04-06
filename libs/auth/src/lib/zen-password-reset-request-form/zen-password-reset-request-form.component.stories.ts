import { Meta, moduleMetadata } from '@storybook/angular';
import { AuthPasswordResetRequestQueryGQL } from '@zen/graphql';

import { AUTH_DECLARATIONS, AUTH_IMPORTS, AUTH_PROVIDERS } from '../test-deps';
import { ZenPasswordResetRequestFormComponent } from './zen-password-reset-request-form.component';

export default {
  title: 'ZenPasswordResetRequestFormComponent',
  component: ZenPasswordResetRequestFormComponent,
  decorators: [
    moduleMetadata({
      imports: AUTH_IMPORTS,
      providers: [...AUTH_PROVIDERS, AuthPasswordResetRequestQueryGQL],
      declarations: AUTH_DECLARATIONS,
    }),
  ],
} as Meta<ZenPasswordResetRequestFormComponent>;

export const Primary = {
  render: (args: ZenPasswordResetRequestFormComponent) => ({
    props: args,
  }),
  args: {},
};
