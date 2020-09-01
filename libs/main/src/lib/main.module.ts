import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { ZenMainComponent } from './zen-main/zen-main.component';

@NgModule({
  imports: [CommonModule, MainRoutingModule],
  declarations: [ZenMainComponent],
  exports: [ZenMainComponent],
})
export class MainModule {}
