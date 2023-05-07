import { Routes } from '@angular/router';
import { LoggedInGuard } from '@zen/auth';

export const MAIN_ROUTES: Routes = [
  { path: '', redirectTo: '/portal/dashboard', pathMatch: 'full' },
  {
    path: 'portal',
    canMatch: [LoggedInGuard],
    loadChildren: () => import('./zen-portal/zen-portal.routes').then(m => m.PORTAL_ROUTES),
  },
];
