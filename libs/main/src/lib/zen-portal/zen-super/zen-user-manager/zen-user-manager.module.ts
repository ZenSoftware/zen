import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FloatingLabelModule } from '@progress/kendo-angular-label';
import { ZenAuthModule } from '@zen/auth';
import { ZenComponentsModule } from '@zen/components';
import { ZenGridModule } from '@zen/grid';

import { ZenUserGridComponent } from './zen-user-grid/zen-user-grid.component';
import { ZenUserInputComponent } from './zen-user-input/zen-user-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    InputsModule,
    FloatingLabelModule,
    ZenAuthModule,
    ZenComponentsModule,
    ZenGridModule,
  ],
  declarations: [ZenUserGridComponent, ZenUserInputComponent],
  exports: [ZenUserGridComponent],
})
export class ZenUserModule {}
