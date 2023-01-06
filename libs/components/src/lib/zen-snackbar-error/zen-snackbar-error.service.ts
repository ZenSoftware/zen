import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { merge } from 'lodash-es';

@Injectable()
export class ZenSnackbarError {
  constructor(private snackBar: MatSnackBar) {}

  open(error: unknown, config?: MatSnackBarConfig & { log?: boolean }) {
    const mergedConfig: MatSnackBarConfig & { log?: boolean } = {
      panelClass: 'error-snackbar',
      duration: 5000,
      log: true,
    };

    merge(mergedConfig, config);

    if (mergedConfig.log) console.error(error);

    const snackBarRef = this.snackBar.open('ERROR', 'Copy', mergedConfig);

    snackBarRef.onAction().subscribe(() => {
      navigator.clipboard.writeText(JSON.stringify(error, null, 2)).then();
    });
  }
}
