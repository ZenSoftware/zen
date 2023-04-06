import { Meta, moduleMetadata } from '@storybook/angular';
import { AuthPasswordResetRequestQueryGQL } from '@zen/graphql';

import { AUTH_DECLARATIONS, AUTH_IMPORTS, AUTH_PROVIDERS } from '../test-deps';
import { ZenPasswordResetRequestFormComponent } from '../zen-password-reset-request-form/zen-password-reset-request-form.component';
import { ZenPasswordResetRequestComponent } from './zen-password-reset-request.component';

export default {
  title: 'ZenPasswordResetRequestComponent',
  component: ZenPasswordResetRequestComponent,
  decorators: [
    moduleMetadata({
      imports: AUTH_IMPORTS,
      providers: [...AUTH_PROVIDERS, AuthPasswordResetRequestQueryGQL],
      declarations: [AUTH_DECLARATIONS, ZenPasswordResetRequestFormComponent],
    }),
  ],
} as Meta<ZenPasswordResetRequestComponent>;

export const Primary = {
  render: (args: ZenPasswordResetRequestComponent) => ({
    props: args,
  }),
  args: {},
};
