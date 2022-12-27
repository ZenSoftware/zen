import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { AuthPasswordResetConfirmationGQL } from '@zen/graphql';

import { AUTH_DECLARATIONS, AUTH_IMPORTS, AUTH_PROVIDERS } from '../storybook-deps';
import { ZenPasswordResetConfirmationFormComponent } from './zen-password-reset-confirmation-form.component';

export default {
  title: 'ZenPasswordResetConfirmationFormComponent',
  component: ZenPasswordResetConfirmationFormComponent,
  decorators: [
    moduleMetadata({
      imports: AUTH_IMPORTS,
      providers: [...AUTH_PROVIDERS, AuthPasswordResetConfirmationGQL],
      declarations: AUTH_DECLARATIONS,
    }),
  ],
} as Meta<ZenPasswordResetConfirmationFormComponent>;

const Template: Story<ZenPasswordResetConfirmationFormComponent> = (
  args: ZenPasswordResetConfirmationFormComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  redirectTime: 5,
};
