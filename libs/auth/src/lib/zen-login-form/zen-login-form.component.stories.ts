import { Meta, Story, moduleMetadata } from '@storybook/angular';

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

const Template: Story<ZenLoginFormComponent> = (args: ZenLoginFormComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  doneMessage: 'Redirecting...',
  doneMessageVisible: true,
};
