import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZenLoginPageComponent } from './zen-login-page/zen-login-page.component';
import { ZenPasswordResetConfirmationComponent } from './zen-password-reset-confirmation/zen-password-reset-confirmation.component';
import { ZenPasswordResetRequestComponent } from './zen-password-reset-request/zen-password-reset-request.component';
import { ZenRegistrationPageComponent } from './zen-registration-page/zen-registration-page.component';

const routes: Routes = [
  { path: 'login', component: ZenLoginPageComponent },
  { path: 'register', component: ZenRegistrationPageComponent },
  { path: 'password-reset-request', component: ZenPasswordResetRequestComponent },
  { path: 'password-reset-confirmation', component: ZenPasswordResetConfirmationComponent },
  // { path: 'verify-account/:token', component: TuVerifyAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
