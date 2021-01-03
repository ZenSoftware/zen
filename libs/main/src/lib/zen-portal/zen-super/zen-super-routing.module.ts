import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperGuard } from '@zen/auth';

import { ZenSuperPageComponent } from './zen-super-page/zen-super-page.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: ZenSuperPageComponent,
    canActivate: [SuperGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ZenSuperRoutingModule {}
