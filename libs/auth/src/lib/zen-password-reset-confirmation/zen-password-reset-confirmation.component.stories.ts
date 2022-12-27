import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { AuthPasswordResetConfirmationGQL } from '@zen/graphql';

import { AUTH_DECLARATIONS, AUTH_IMPORTS, AUTH_PROVIDERS } from '../storybook-deps';
import { ZenPasswordResetConfirmationFormComponent } from '../zen-password-reset-confirmation-form/zen-password-reset-confirmation-form.component';
import { ZenPasswordResetConfirmationComponent } from './zen-password-reset-confirmation.component';

export default {
  title: 'ZenPasswordResetConfirmationComponent',
  component: ZenPasswordResetConfirmationComponent,
  decorators: [
    moduleMetadata({
      imports: AUTH_IMPORTS,
      providers: [...AUTH_PROVIDERS, AuthPasswordResetConfirmationGQL],
      declarations: [...AUTH_DECLARATIONS, ZenPasswordResetConfirmationFormComponent],
    }),
  ],
} as Meta<ZenPasswordResetConfirmationComponent>;

const Template: Story<ZenPasswordResetConfirmationComponent> = (
  args: ZenPasswordResetConfirmationComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
