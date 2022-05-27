import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZenMainComponent } from './zen-main/zen-main.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '',
    component: ZenMainComponent,
    loadChildren: () => import('./zen-portal/zen-portal.module').then(m => m.ZenPortalModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZenMainRoutingModule {}
