import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ZenAuthModule } from '@zen/auth';

import { ZenDashboardComponent } from './zen-dashboard/zen-dashboard.component';
import { ZenPortalMainComponent } from './zen-portal-main/zen-portal-main.component';
import { ZenPortalRoutingModule } from './zen-portal-routing.module';

@NgModule({
  imports: [CommonModule, MatSidenavModule, ZenAuthModule, ZenPortalRoutingModule],
  declarations: [ZenDashboardComponent, ZenPortalMainComponent],
})
export class ZenPortalModule {}
