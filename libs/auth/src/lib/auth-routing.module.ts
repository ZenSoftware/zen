import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZenLoginPageComponent } from './zen-login-page/zen-login-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: ZenLoginPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
