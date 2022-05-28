import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZenSuperPageComponent } from './zen-super-page/zen-super-page.component';

const routes: Routes = [
  {
    path: '',
    component: ZenSuperPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZenSuperRoutingModule {}
