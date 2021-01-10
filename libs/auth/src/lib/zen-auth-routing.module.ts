import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicRegistrationGuard } from './guards';
import { ZenLoginPageComponent } from './zen-login-page/zen-login-page.component';
import { ZenPasswordResetConfirmationPageComponent } from './zen-password-reset-confirmation-page/zen-password-reset-confirmation-page.component';
import { ZenPasswordResetRequestPageComponent } from './zen-password-reset-request-page/zen-password-reset-request-page.component';
import { ZenRegisterPageComponent } from './zen-register-page/zen-register-page.component';

const routes: Routes = [
  { path: 'login', component: ZenLoginPageComponent },
  {
    path: 'register',
    component: ZenRegisterPageComponent,
    canActivate: [PublicRegistrationGuard],
  },
  { path: 'password-reset-request', component: ZenPasswordResetRequestPageComponent },
  {
    path: 'password-reset-confirmation',
    component: ZenPasswordResetConfirmationPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZenAuthRoutingModule {}
