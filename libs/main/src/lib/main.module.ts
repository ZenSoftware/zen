import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';

import { MainRoutingModule } from './main-routing.module';
import { ZenMainComponent } from './zen-main/zen-main.component';

@NgModule({
  imports: [CommonModule, MainRoutingModule, MatButtonModule, MatDividerModule, MatSliderModule],
  declarations: [ZenMainComponent],
})
export class MainModule {}
