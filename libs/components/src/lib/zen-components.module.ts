import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ZenConfirmComponent } from './zen-confirm/zen-confirm.component';
import { ZenLayoutComponent } from './zen-layout/zen-layout.component';
import { ZenLoadingComponent } from './zen-loading/zen-loading.component';
import { ZenSnackbarErrorService } from './zen-snackbar-error/zen-snackbar-error.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
  ],
  declarations: [ZenConfirmComponent, ZenLoadingComponent, ZenLayoutComponent],
  exports: [ZenConfirmComponent, ZenLoadingComponent, ZenLayoutComponent],
  providers: [ZenSnackbarErrorService],
})
export class ZenComponentsModule {}
