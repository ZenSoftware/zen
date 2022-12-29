import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Meta, Story, moduleMetadata } from '@storybook/angular';

import { ZenConfirmComponent } from './zen-confirm.component';

export default {
  title: 'ZenConfirmComponent',
  component: ZenConfirmComponent,
  decorators: [
    moduleMetadata({
      imports: [MatButtonModule, MatDialogModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {
              //
            },
          },
        },
      ],
    }),
  ],
} as Meta<ZenConfirmComponent>;

const Template: Story<ZenConfirmComponent> = (args: ZenConfirmComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
