import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { AuthPasswordResetConfirmationGQL } from '@zen/graphql';

import { AUTH_DECLARATIONS, AUTH_IMPORTS, AUTH_PROVIDERS } from '../story-deps';
import { ZenPasswordResetConfirmationFormComponent } from '../zen-password-reset-confirmation-form/zen-password-reset-confirmation-form.component';
import { ZenPasswordResetConfirmationComponent } from '../zen-password-reset-confirmation/zen-password-reset-confirmation.component';
import { ZenPasswordResetConfirmationPageComponent } from './zen-password-reset-confirmation-page.component';

export default {
  title: 'ZenPasswordResetConfirmationPageComponent',
  component: ZenPasswordResetConfirmationPageComponent,
  decorators: [
    moduleMetadata({
      imports: AUTH_IMPORTS,
      providers: [...AUTH_PROVIDERS, AuthPasswordResetConfirmationGQL],
      declarations: [
        ...AUTH_DECLARATIONS,
        ZenPasswordResetConfirmationFormComponent,
        ZenPasswordResetConfirmationComponent,
      ],
    }),
  ],
} as Meta<ZenPasswordResetConfirmationPageComponent>;

const Template: Story<ZenPasswordResetConfirmationPageComponent> = (
  args: ZenPasswordResetConfirmationPageComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
