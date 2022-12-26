import { Meta, Story, moduleMetadata } from '@storybook/angular';

import { AUTH_DECLARATIONS, AUTH_IMPORTS, AUTH_PROVIDERS } from '../story-deps';
import { ZenLoginFormComponent } from '../zen-login-form/zen-login-form.component';
import { ZenLoginPageComponent } from './zen-login-page.component';

export default {
  title: 'ZenLoginPageComponent',
  component: ZenLoginPageComponent,
  decorators: [
    moduleMetadata({
      imports: AUTH_IMPORTS,
      providers: AUTH_PROVIDERS,
      declarations: [...AUTH_DECLARATIONS, ZenLoginFormComponent],
    }),
  ],
} as Meta<ZenLoginPageComponent>;

const Template: Story<ZenLoginPageComponent> = (args: ZenLoginPageComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
