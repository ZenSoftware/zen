import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZenHomeComponent } from './zen-home/zen-home.component';

// import { ZenPublicMainComponent } from './zen-public-main/zen-public-main.component';

export const ROUTES: Routes = [
  {
    path: 'home',
    component: ZenHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ZenPublicRoutingModule {}
