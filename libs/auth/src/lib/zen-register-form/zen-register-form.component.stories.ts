import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { AuthRegisterGQL } from '@zen/graphql';

import { AUTH_DECLARATIONS, AUTH_IMPORTS, AUTH_PROVIDERS } from '../test-deps';
import { ZenRegisterFormComponent } from './zen-register-form.component';

export default {
  title: 'ZenRegisterFormComponent',
  component: ZenRegisterFormComponent,
  decorators: [
    moduleMetadata({
      imports: AUTH_IMPORTS,
      providers: [...AUTH_PROVIDERS, AuthRegisterGQL],
      declarations: AUTH_DECLARATIONS,
    }),
  ],
} as Meta<ZenRegisterFormComponent>;

const Template: Story<ZenRegisterFormComponent> = (args: ZenRegisterFormComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
