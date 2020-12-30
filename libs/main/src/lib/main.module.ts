import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthModule } from '@zen/auth';

import { MainRoutingModule } from './main-routing.module';
import { ZenDashboardComponent } from './zen-dashboard/zen-dashboard.component';
import { ZenMainComponent } from './zen-main/zen-main.component';

@NgModule({
  imports: [CommonModule, MatSidenavModule, MainRoutingModule, AuthModule],
  declarations: [ZenMainComponent, ZenDashboardComponent],
})
export class MainModule {}
