import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story, moduleMetadata } from '@storybook/angular';

import { ZenLoadingComponent } from './zen-loading.component';

export default {
  title: 'ZenLoadingComponent',
  component: ZenLoadingComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, MatProgressSpinnerModule],
    }),
  ],
  args: {
    backdrop: true,
  },
} as Meta<ZenLoadingComponent>;

const Template: Story<ZenLoadingComponent> = (args: ZenLoadingComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
