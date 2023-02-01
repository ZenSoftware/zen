import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '@zen/auth';

const routes: Routes = [
  { path: '', redirectTo: '/portal/dashboard', pathMatch: 'full' },
  {
    path: 'portal',
    canMatch: [LoggedInGuard],
    loadChildren: () => import('./zen-portal/zen-portal.module').then(m => m.ZenPortalModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZenMainRoutingModule {}
