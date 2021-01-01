import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ZenComponentsModule } from '@zen/components';

import { AuthRoutingModule } from './auth-routing.module';
import { IsLoggedInDirective, NotRolesDirective, RolesDirective } from './directives';
import { ZenLoginFormComponent } from './zen-login-form/zen-login-form.component';
import { ZenLoginLinkComponent } from './zen-login-link/zen-login-link.component';
import { ZenLoginPageComponent } from './zen-login-page/zen-login-page.component';
import { ZenPasswordResetConfirmationPageComponent } from './zen-password-reset-confirmation-page/zen-password-reset-confirmation-page.component';
import { ZenPasswordResetConfirmationComponent } from './zen-password-reset-confirmation/zen-password-reset-confirmation.component';
import { ZenPasswordResetRequestPageComponent } from './zen-password-reset-request-page/zen-password-reset-request-page.component';
import { ZenPasswordResetRequestComponent } from './zen-password-reset-request/zen-password-reset-request.component';
import { ZenRegisterFormComponent } from './zen-register-form/zen-register-form.component';
import { ZenRegisterPageComponent } from './zen-register-page/zen-register-page.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    AuthRoutingModule,
    ZenComponentsModule,
  ],
  declarations: [
    IsLoggedInDirective,
    NotRolesDirective,
    RolesDirective,
    ZenLoginFormComponent,
    ZenLoginPageComponent,
    ZenLoginLinkComponent,
    ZenPasswordResetConfirmationPageComponent,
    ZenPasswordResetConfirmationComponent,
    ZenPasswordResetRequestPageComponent,
    ZenPasswordResetRequestComponent,
    ZenRegisterFormComponent,
    ZenRegisterPageComponent,
  ],
  exports: [
    IsLoggedInDirective,
    NotRolesDirective,
    RolesDirective,
    ZenLoginFormComponent,
    ZenLoginPageComponent,
    ZenLoginLinkComponent,
    ZenPasswordResetConfirmationPageComponent,
    ZenPasswordResetConfirmationComponent,
    ZenPasswordResetRequestPageComponent,
    ZenPasswordResetRequestComponent,
    ZenRegisterFormComponent,
    ZenRegisterPageComponent,
  ],
})
export class AuthModule {}
