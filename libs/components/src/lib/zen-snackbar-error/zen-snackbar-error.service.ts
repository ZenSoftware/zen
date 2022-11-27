import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Injectable()
export class ZenSnackbarErrorService {
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
