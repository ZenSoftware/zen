import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ZenSnackbarErrorService {
  constructor(private snackBar: MatSnackBar) {}

  open(error: any) {
    console.error(JSON.stringify(error));

    const snackBarRef = this.snackBar.open('ERROR', 'Copy', {
      panelClass: 'bg-danger',
      duration: 5000,
    });

    snackBarRef.onAction().subscribe(() => {
      navigator.clipboard.writeText(JSON.stringify(error)).then();
    });
  }
}
