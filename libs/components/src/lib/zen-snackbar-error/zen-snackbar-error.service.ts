import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class ZenSnackbarError {
  constructor(private snackBar: MatSnackBar) {}

  open(error: unknown, config?: MatSnackBarConfig & { log?: boolean }) {
    const mergedConfig: MatSnackBarConfig & { log?: boolean } = {
      panelClass: 'snackbar-error',
      duration: 5000,
      log: true,
    };

    Object.assign(mergedConfig, config);

    if (mergedConfig.log) console.error(error);

    const snackBarRef = this.snackBar.open('ERROR', 'Copy', mergedConfig);

    snackBarRef.onAction().subscribe(() => {
      navigator.clipboard.writeText(JSON.stringify(error, null, 2)).then();
    });
  }
}
