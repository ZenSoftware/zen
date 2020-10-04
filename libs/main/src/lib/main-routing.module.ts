import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '@zen/auth';

import { ZenMainComponent } from './zen-main/zen-main.component';

const routes: Routes = [
  {
    path: '',
    component: ZenMainComponent,
    canActivate: [LoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
