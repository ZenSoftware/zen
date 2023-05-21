import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ZenConfirmOptions } from './zen-confirm-options';
import { ZenConfirmComponent } from './zen-confirm/zen-confirm.component';

@Injectable()
export class ZenConfirmModal {
  constructor(private dialog: MatDialog) {}

  open(options?: ZenConfirmOptions): Observable<boolean | undefined> {
    const dialogRef = this.dialog.open<ZenConfirmComponent, ZenConfirmOptions, boolean | undefined>(
      ZenConfirmComponent,
      { data: options }
    );

    return dialogRef.afterClosed();
  }
}
