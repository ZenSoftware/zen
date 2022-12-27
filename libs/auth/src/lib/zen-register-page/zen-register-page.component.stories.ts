import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { AuthRegisterGQL } from '@zen/graphql';

import { AUTH_DECLARATIONS, AUTH_IMPORTS, AUTH_PROVIDERS } from '../test-deps';
import { ZenRegisterFormComponent } from '../zen-register-form/zen-register-form.component';
import { ZenRegisterComponent } from '../zen-register/zen-register.component';
import { ZenRegisterPageComponent } from './zen-register-page.component';

export default {
  title: 'ZenRegisterPageComponent',
  component: ZenRegisterPageComponent,
  decorators: [
    moduleMetadata({
      imports: AUTH_IMPORTS,
      providers: [...AUTH_PROVIDERS, AuthRegisterGQL],
      declarations: [...AUTH_DECLARATIONS, ZenRegisterFormComponent, ZenRegisterComponent],
    }),
  ],
} as Meta<ZenRegisterPageComponent>;

const Template: Story<ZenRegisterPageComponent> = (args: ZenRegisterPageComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
