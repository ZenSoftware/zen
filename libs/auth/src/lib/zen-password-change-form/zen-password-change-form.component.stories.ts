import { Meta, moduleMetadata } from '@storybook/angular';
import { AuthPasswordChangeGQL } from '@zen/graphql';

import { AUTH_DECLARATIONS, AUTH_IMPORTS, AUTH_PROVIDERS } from '../test-deps';
import { ZenPasswordChangeFormComponent } from './zen-password-change-form.component';

export default {
  title: 'ZenPasswordChangeFormComponent',
  component: ZenPasswordChangeFormComponent,
  decorators: [
    moduleMetadata({
      imports: AUTH_IMPORTS,
      providers: [...AUTH_PROVIDERS, AuthPasswordChangeGQL],
      declarations: AUTH_DECLARATIONS,
    }),
  ],
} as Meta<ZenPasswordChangeFormComponent>;

export const Primary = {
  render: (args: ZenPasswordChangeFormComponent) => ({
    props: args,
  }),
  args: {},
};
