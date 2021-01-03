import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ZenDashboardComponent } from './zen-dashboard/zen-dashboard.component';
import { ZenPortalMainComponent } from './zen-portal-main/zen-portal-main.component';
import { ZenPortalRoutingModule } from './zen-portal-routing.module';
import { ZenSuperModule } from './zen-super';

@NgModule({
  imports: [CommonModule, MatSidenavModule, ZenPortalRoutingModule, ZenSuperModule],
  declarations: [ZenDashboardComponent, ZenPortalMainComponent],
})
export class ZenPortalModule {}
