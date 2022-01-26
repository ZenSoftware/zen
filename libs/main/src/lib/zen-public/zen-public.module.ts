import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ZenAuthModule } from '@zen/auth';

import { ZenHomeComponent } from './zen-home/zen-home.component';
import { ZenPublicMainComponent } from './zen-public-main/zen-public-main.component';
import { ZenPublicRoutingModule } from './zen-public-routing.module';

@NgModule({
  imports: [CommonModule, ZenAuthModule, ZenPublicRoutingModule],
  declarations: [ZenHomeComponent, ZenPublicMainComponent],
})
export class ZenPublicModule {}
