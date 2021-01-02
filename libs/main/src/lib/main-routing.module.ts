import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard, SuperGuard } from '@zen/auth';

import { ZenDashboardComponent } from './zen-dashboard/zen-dashboard.component';
import { ZenMainComponent } from './zen-main/zen-main.component';
import { ZenSuperPageComponent } from './zen-super';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '',
    component: ZenMainComponent,
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
