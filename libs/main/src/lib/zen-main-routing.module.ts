import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '@zen/auth';

import { ZenNotFoundComponent } from './zen-not-found/zen-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/portal/dashboard', pathMatch: 'full' },
  {
    path: 'portal',
    canMatch: [LoggedInGuard],
    loadChildren: () => import('./zen-portal/zen-portal.module').then(m => m.ZenPortalModule),
  },
  {
    path: '**',
    component: ZenNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZenMainRoutingModule {}
