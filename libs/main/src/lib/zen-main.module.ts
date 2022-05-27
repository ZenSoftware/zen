import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ZenAuthModule } from '@zen/auth';

import { ZenMainRoutingModule } from './zen-main-routing.module';
import { ZenMainComponent } from './zen-main/zen-main.component';

@NgModule({
  imports: [CommonModule, ZenMainRoutingModule, ZenAuthModule],
  declarations: [ZenMainComponent],
})
export class ZenMainModule {}
