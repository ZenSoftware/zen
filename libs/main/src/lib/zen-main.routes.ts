import { Routes } from '@angular/router';
import { LoggedInGuard } from '@zen/auth';
import { ZenUnityComponent } from '@zen/components';

export const MAIN_ROUTES: Routes = [
  { path: '', redirectTo: '/portal/dashboard', pathMatch: 'full' },
  {
    path: 'portal',
    canMatch: [LoggedInGuard],
    loadChildren: () => import('./zen-portal/zen-portal.routes').then(m => m.PORTAL_ROUTES),
  },
  { path: 'unity', component: ZenUnityComponent },
];
