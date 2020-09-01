import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZenMainComponent } from './zen-main/zen-main.component';

const routes: Routes = [
  {
    path: '',
    component: ZenMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
