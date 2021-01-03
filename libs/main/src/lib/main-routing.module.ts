import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '@zen/auth';

import { ZenMainComponent } from './zen-main/zen-main.component';

const routes: Routes = [
  // TODO: look into making default portal path configurable
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '',
    component: ZenMainComponent,
    canActivate: [LoggedInGuard],
    loadChildren: () =>
      import('./zen-portal/zen-portal.module').then(m => m.ZenPortalModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
