import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Meta, moduleMetadata } from '@storybook/angular';

import { ZenConfirmComponent } from './zen-confirm.component';

export default {
  title: 'ZenConfirmComponent',
  component: ZenConfirmComponent,
  decorators: [
    moduleMetadata({
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
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

export const Primary = {
  render: (args: ZenConfirmComponent) => ({
    props: args,
  }),
};
