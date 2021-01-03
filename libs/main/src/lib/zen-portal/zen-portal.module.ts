import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ZenDashboardComponent } from './zen-dashboard/zen-dashboard.component';
import { ZenPortalRoutingModule } from './zen-portal-routing.module';
import { ZenPortalComponent } from './zen-portal/zen-portal.component';
import { ZenSuperModule } from './zen-super';

@NgModule({
  imports: [CommonModule, MatSidenavModule, ZenPortalRoutingModule, ZenSuperModule],
  declarations: [ZenDashboardComponent, ZenPortalComponent],
})
export class ZenPortalModule {}
