import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZenLoginPageComponent } from './zen-login-page/zen-login-page.component';
import { ZenPasswordResetConfirmationComponent } from './zen-password-reset-confirmation/zen-password-reset-confirmation.component';
import { ZenPasswordResetRequestPageComponent } from './zen-password-reset-request-page/zen-password-reset-request-page.component';
import { ZenRegisterPageComponent } from './zen-register-page/zen-register-page.component';

const routes: Routes = [
  { path: 'login', component: ZenLoginPageComponent },
  { path: 'register', component: ZenRegisterPageComponent },
  { path: 'password-reset-request', component: ZenPasswordResetRequestPageComponent },
  { path: 'password-reset-confirmation', component: ZenPasswordResetConfirmationComponent },
  // { path: 'verify-account/:token', component: TuVerifyAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
