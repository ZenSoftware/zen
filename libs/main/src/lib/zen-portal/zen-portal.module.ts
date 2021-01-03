import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ZenDashboardComponent } from './zen-dashboard/zen-dashboard.component';
import { ZenSuperModule } from './zen-super';

@NgModule({
  imports: [CommonModule, ZenSuperModule],
  declarations: [ZenDashboardComponent],
})
export class ZenPortalModule {}
