import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ZenSnackbarError {
  constructor(private snackBar: MatSnackBar) {}

  open(error: unknown) {
    console.error(error);

    const snackBarRef = this.snackBar.open('ERROR', 'Copy', {
      panelClass: 'bg-danger',
      duration: 5000,
    });

    snackBarRef.onAction().subscribe(() => {
      navigator.clipboard.writeText(JSON.stringify(error, null, 2)).then();
    });
  }
}
