import { Routes } from '@angular/router';
import { SuperGuard } from '@zen/auth';

import { ZenDashboardComponent } from './zen-dashboard/zen-dashboard.component';
import { ZenSuperPageComponent } from './zen-super';

export const ROUTES: Routes = [
  {
    path: 'dashboard',
    component: ZenDashboardComponent,
  },
  {
    path: 'super',
    component: ZenSuperPageComponent,
    canActivate: [SuperGuard],
  },
];
