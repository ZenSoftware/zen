import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard, SuperGuard } from '@zen/auth';

import { ZenDashboardComponent } from './zen-dashboard/zen-dashboard.component';
import { ZenPortalComponent } from './zen-portal/zen-portal.component';
import { ZenSuperPageComponent } from './zen-super';

export const ROUTES: Routes = [
  {
    path: '',
    component: ZenPortalComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: 'dashboard',
        component: ZenDashboardComponent,
      },
      {
        path: 'super',
        component: ZenSuperPageComponent,
        canActivate: [SuperGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ZenPortalRoutingModule {}
