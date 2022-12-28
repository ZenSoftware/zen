import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AbilityModule } from '@casl/angular';
import { ZenComponentsModule } from '@zen/components';

import {
  IfLoggedInDirective,
  IfPublicRegistrationDirective,
  NotRolesDirective,
  RolesDirective,
} from './directives';
import { ZenAuthRoutingModule } from './zen-auth-routing.module';
import { ZenLoginConfirmedComponent } from './zen-login-confirmed/zen-login-confirmed.component';
import { ZenLoginFormComponent } from './zen-login-form/zen-login-form.component';
import { ZenLoginLinkComponent } from './zen-login-link/zen-login-link.component';
import { ZenLoginPageComponent } from './zen-login-page/zen-login-page.component';
import { ZenLoginComponent } from './zen-login/zen-login.component';
import { ZenPasswordChangeFormComponent } from './zen-password-change-form/zen-password-change-form.component';
import { ZenPasswordChangeComponent } from './zen-password-change/zen-password-change.component';
import { ZenPasswordResetConfirmationFormComponent } from './zen-password-reset-confirmation-form/zen-password-reset-confirmation-form.component';
import { ZenPasswordResetConfirmationPageComponent } from './zen-password-reset-confirmation-page/zen-password-reset-confirmation-page.component';
import { ZenPasswordResetConfirmationComponent } from './zen-password-reset-confirmation/zen-password-reset-confirmation.component';
import { ZenPasswordResetRequestFormComponent } from './zen-password-reset-request-form/zen-password-reset-request-form.component';
import { ZenPasswordResetRequestPageComponent } from './zen-password-reset-request-page/zen-password-reset-request-page.component';
import { ZenPasswordResetRequestComponent } from './zen-password-reset-request/zen-password-reset-request.component';
import { ZenRegisterFormComponent } from './zen-register-form/zen-register-form.component';
import { ZenRegisterPageComponent } from './zen-register-page/zen-register-page.component';
import { ZenRegisterComponent } from './zen-register/zen-register.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule,
    ZenAuthRoutingModule,
    ZenComponentsModule,
  ],
  declarations: [
    IfLoggedInDirective,
    IfPublicRegistrationDirective,
    NotRolesDirective,
    RolesDirective,

    ZenLoginComponent,
    ZenLoginConfirmedComponent,
    ZenLoginFormComponent,
    ZenLoginLinkComponent,
    ZenLoginPageComponent,
    ZenPasswordChangeComponent,
    ZenPasswordChangeFormComponent,
    ZenPasswordResetConfirmationComponent,
    ZenPasswordResetConfirmationFormComponent,
    ZenPasswordResetConfirmationPageComponent,
    ZenPasswordResetRequestComponent,
    ZenPasswordResetRequestFormComponent,
    ZenPasswordResetRequestPageComponent,
    ZenRegisterComponent,
    ZenRegisterFormComponent,
    ZenRegisterPageComponent,
  ],
  exports: [
    AbilityModule,

    IfLoggedInDirective,
    IfPublicRegistrationDirective,
    NotRolesDirective,
    RolesDirective,

    ZenLoginComponent,
    ZenLoginConfirmedComponent,
    ZenLoginFormComponent,
    ZenLoginLinkComponent,
    ZenPasswordChangeComponent,
    ZenPasswordChangeFormComponent,
    ZenPasswordResetConfirmationComponent,
    ZenPasswordResetConfirmationFormComponent,
    ZenPasswordResetRequestComponent,
    ZenPasswordResetRequestFormComponent,
    ZenRegisterComponent,
    ZenRegisterFormComponent,
  ],
})
export class ZenAuthModule {}
