import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ZenConfirmComponent } from './zen-confirm/zen-confirm.component';
import { ZenLoadingComponent } from './zen-loading/zen-loading.component';
import { ZenSnackbarErrorService } from './zen-snackbar-error/zen-snackbar-error.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  declarations: [ZenConfirmComponent, ZenLoadingComponent],
  exports: [ZenConfirmComponent, ZenLoadingComponent],
  providers: [ZenSnackbarErrorService],
})
export class ZenComponentsModule {}
