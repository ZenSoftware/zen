import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ZenSnackbarError } from './zen-snackbar-error.service';

@NgModule({
  imports: [MatSnackBarModule],
  providers: [ZenSnackbarError],
})
export class ZenSnackbarModule {}
