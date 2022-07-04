import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ExcelModule, GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ZenComponentsModule } from '@zen/components';

import { KendoToPrismaService } from './services';
import { ZenGridDetailTemplateDirective } from './zen-grid/zen-grid-detail-template.directive';
import { ZenGridComponent } from './zen-grid/zen-grid.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatButtonModule,
    MatSnackBarModule,
    ExcelModule,
    GridModule,
    InputsModule,
    ZenComponentsModule,
  ],
  exports: [ZenGridComponent, ZenGridDetailTemplateDirective],
  declarations: [ZenGridComponent, ZenGridDetailTemplateDirective],
  providers: [KendoToPrismaService],
})
export class ZenGridModule {}
