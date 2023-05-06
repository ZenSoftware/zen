import { Routes } from '@angular/router';
import { RolesGuard } from '@zen/auth';

import { ZenDashboardComponent } from './zen-dashboard/zen-dashboard.component';
import { ZenPortalMainComponent } from './zen-portal-main/zen-portal-main.component';
import { ZenSettingsComponent } from './zen-settings/zen-settings.component';

export const PORTAL_ROUTES: Routes = [
  {
    path: '',
    component: ZenPortalMainComponent,
    children: [
      {
        path: 'dashboard',
        component: ZenDashboardComponent,
      },
      {
        path: 'settings',
        component: ZenSettingsComponent,
      },
      {
        path: 'super',
        // canMatch: [CaslGuard.can('manage', 'all')],
        canMatch: [RolesGuard.has('Super')],
        loadChildren: () => import('./zen-super/zen-super.routes').then(m => m.SUPER_ROUTES),
      },
    ],
  },
];
