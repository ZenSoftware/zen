import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '@zen/auth';

import { ZenMainComponent } from './zen-main/zen-main.component';
import { ROUTES as PORTAL_ROUTES } from './zen-portal';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '',
    component: ZenMainComponent,
    canActivate: [LoggedInGuard],
    children: [...PORTAL_ROUTES],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
