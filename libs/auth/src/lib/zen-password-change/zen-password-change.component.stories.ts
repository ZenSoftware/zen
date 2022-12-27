import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { AuthPasswordChangeGQL } from '@zen/graphql';

import { AUTH_DECLARATIONS, AUTH_IMPORTS, AUTH_PROVIDERS } from '../storybook-deps';
import { ZenPasswordChangeFormComponent } from '../zen-password-change-form/zen-password-change-form.component';
import { ZenPasswordChangeComponent } from './zen-password-change.component';

export default {
  title: 'ZenPasswordChangeComponent',
  component: ZenPasswordChangeComponent,
  decorators: [
    moduleMetadata({
      imports: AUTH_IMPORTS,
      providers: [...AUTH_PROVIDERS, AuthPasswordChangeGQL],
      declarations: [...AUTH_DECLARATIONS, ZenPasswordChangeFormComponent],
    }),
  ],
} as Meta<ZenPasswordChangeComponent>;

const Template: Story<ZenPasswordChangeComponent> = (args: ZenPasswordChangeComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
