import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ZenConfirmOptions } from './zen-confirm-options';
import { ZenConfirmComponent } from './zen-confirm.component';

@Injectable()
export class ZenConfirmModal {
  constructor(private dialog: MatDialog) {}

  open(options?: ZenConfirmOptions) {
    const dialogRef = this.dialog.open<ZenConfirmComponent, ZenConfirmOptions, boolean | undefined>(
      ZenConfirmComponent,
      { data: options }
    );

    return dialogRef.afterClosed();
  }
}
