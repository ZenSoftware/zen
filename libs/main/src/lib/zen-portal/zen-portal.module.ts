import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ZenAuthModule } from '@zen/auth';

import { ZenChatModule } from './zen-chat';
import { ZenDashboardComponent } from './zen-dashboard/zen-dashboard.component';
import { ZenPortalMainComponent } from './zen-portal-main/zen-portal-main.component';
import { ZenPortalRoutingModule } from './zen-portal-routing.module';
import { ZenSettingsComponent } from './zen-settings/zen-settings.component';

@NgModule({
  imports: [CommonModule, MatSidenavModule, ZenAuthModule, ZenPortalRoutingModule, ZenChatModule],
  declarations: [ZenDashboardComponent, ZenPortalMainComponent, ZenSettingsComponent],
})
export class ZenPortalModule {}
