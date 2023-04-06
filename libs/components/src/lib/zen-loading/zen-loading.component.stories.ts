import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata } from '@storybook/angular';

import { ZenLoadingComponent } from './zen-loading.component';

export default {
  title: 'ZenLoadingComponent',
  component: ZenLoadingComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, MatProgressSpinnerModule],
    }),
  ],
} as Meta<ZenLoadingComponent>;

export const Primary = {
  render: (args: ZenLoadingComponent) => ({
    props: args,
  }),
  args: {
    backdrop: true,
  },
};
