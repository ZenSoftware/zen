import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ZenAuthModule } from '@zen/auth';

import { MainRoutingModule } from './main-routing.module';
import { ZenMainComponent } from './zen-main/zen-main.component';
import { ZenPortalModule } from './zen-portal';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MainRoutingModule,
    ZenAuthModule,
    ZenPortalModule,
  ],
  declarations: [ZenMainComponent],
})
export class MainModule {}
