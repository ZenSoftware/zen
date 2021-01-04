import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ZenComponentsModule } from '@zen/components';

import { IsLoggedInDirective, NotRolesDirective, RolesDirective } from './directives';
import { ZenAuthRoutingModule } from './zen-auth-routing.module';
import { ZenLoginFormComponent } from './zen-login-form/zen-login-form.component';
import { ZenLoginLinkComponent } from './zen-login-link/zen-login-link.component';
import { ZenLoginPageComponent } from './zen-login-page/zen-login-page.component';
import { ZenLoginComponent } from './zen-login/zen-login.component';
import { ZenPasswordChangeComponent } from './zen-password-change/zen-password-change.component';
import { ZenPasswordResetConfirmationPageComponent } from './zen-password-reset-confirmation-page/zen-password-reset-confirmation-page.component';
import { ZenPasswordResetConfirmationComponent } from './zen-password-reset-confirmation/zen-password-reset-confirmation.component';
import { ZenPasswordResetRequestPageComponent } from './zen-password-reset-request-page/zen-password-reset-request-page.component';
import { ZenPasswordResetRequestComponent } from './zen-password-reset-request/zen-password-reset-request.component';
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
    IsLoggedInDirective,
    NotRolesDirective,
    RolesDirective,
    ZenLoginFormComponent,
    ZenLoginLinkComponent,
    ZenLoginPageComponent,
    ZenLoginComponent,
    ZenPasswordChangeComponent,
    ZenPasswordResetConfirmationPageComponent,
    ZenPasswordResetConfirmationComponent,
    ZenPasswordResetRequestPageComponent,
    ZenPasswordResetRequestComponent,
    ZenRegisterPageComponent,
    ZenRegisterComponent,
  ],
  exports: [
    IsLoggedInDirective,
    NotRolesDirective,
    RolesDirective,
    ZenLoginComponent,
    ZenLoginPageComponent,
    ZenLoginLinkComponent,
    ZenPasswordChangeComponent,
    ZenPasswordResetConfirmationPageComponent,
    ZenPasswordResetConfirmationComponent,
    ZenPasswordResetRequestPageComponent,
    ZenPasswordResetRequestComponent,
    ZenRegisterComponent,
    ZenRegisterPageComponent,
  ],
})
export class ZenAuthModule {}
