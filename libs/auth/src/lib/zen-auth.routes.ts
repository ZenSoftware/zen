import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicRegistrationGuard } from './guards';
import { LoginPageGuard } from './guards/login-page.guard';
import { ZenLoginConfirmedComponent } from './zen-login-confirmed/zen-login-confirmed.component';
import { ZenLoginPageComponent } from './zen-login-page/zen-login-page.component';
import { ZenPasswordResetConfirmationPageComponent } from './zen-password-reset-confirmation-page/zen-password-reset-confirmation-page.component';
import { ZenPasswordResetRequestPageComponent } from './zen-password-reset-request-page/zen-password-reset-request-page.component';
import { ZenRegisterPageComponent } from './zen-register-page/zen-register-page.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: ZenLoginPageComponent,
    canActivate: [LoginPageGuard],
  },
  {
    path: 'login-confirmed',
    component: ZenLoginConfirmedComponent,
  },
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
