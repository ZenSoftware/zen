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
import { ZenPasswordResetConfirmationComponent } from './zen-password-reset-confirmation/zen-password-reset-confirmation.component';
import { ZenPasswordResetRequestComponent } from './zen-password-reset-request/zen-password-reset-request.component';
import { ZenRegistrationFormComponent } from './zen-registration-form/zen-registration-form.component';
import { ZenRegistrationPageComponent } from './zen-registration-page/zen-registration-page.component';

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
    ZenPasswordResetConfirmationComponent,
    ZenPasswordResetRequestComponent,
    ZenRegistrationFormComponent,
    ZenRegistrationPageComponent,
  ],
  exports: [
    IsLoggedInDirective,
    NotRolesDirective,
    RolesDirective,
    ZenLoginFormComponent,
    ZenLoginPageComponent,
    ZenLoginLinkComponent,
    ZenPasswordResetConfirmationComponent,
    ZenPasswordResetRequestComponent,
    ZenRegistrationFormComponent,
    ZenRegistrationPageComponent,
  ],
})
export class AuthModule {}
