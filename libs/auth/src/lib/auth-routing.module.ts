import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZenLoginPageComponent } from './zen-login-page/zen-login-page.component';
import { ZenRegistrationPageComponent } from './zen-registration-page/zen-registration-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: ZenLoginPageComponent,
  },
  {
    path: 'registration',
    component: ZenRegistrationPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
