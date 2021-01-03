import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ZenAuthModule } from '@zen/auth';

import { MainRoutingModule } from './main-routing.module';
import { ZenMainComponent } from './zen-main/zen-main.component';

@NgModule({
  imports: [CommonModule, MainRoutingModule, ZenAuthModule],
  declarations: [ZenMainComponent],
})
export class MainModule {}
