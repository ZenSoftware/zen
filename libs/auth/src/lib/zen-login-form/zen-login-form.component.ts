import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { extractGraphQLErrors } from '@zen/graphql';

import { AuthService } from '../auth.service';
import { emailValidator } from '../validators';

@Component({
  selector: 'zen-login-form',
  templateUrl: 'zen-login-form.component.html',
})
export class ZenLoginFormComponent {
  @Output() loggedIn = new EventEmitter();

  #loading = false;
  hidePassword = true;
  loginForm: FormGroup;
  emailNotFound = false;
  incorrectPassword = false;
  generalError = false;
  accountNeedsVerification = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
    // Emit immediately to auto re-direct user if they are already logged in
    if (this.auth.loggedIn) this.loggedIn.emit();

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator(), this.emailNotFoundValidator()]],
      password: ['', [Validators.required, this.incorrectPasswordValidator()]],
      rememberMe: [false],
    });
  }

  get loading() {
    return this.#loading;
  }

  set loading(value) {
    this.#loading = value;
    if (value) this.loginForm.disable();
    else this.loginForm.enable();
  }

  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  get rememberMe(): any {
    return this.loginForm.get('rememberMe');
  }

  emailNotFoundReset() {
    this.emailNotFound = false;
    this.email.updateValueAndValidity();
  }

  emailNotFoundValidator(): ValidatorFn {
    return control => {
      if (this.emailNotFound) return { notFound: true };
      return null;
    };
  }

  incorrectPasswordReset() {
    this.incorrectPassword = false;
    this.password.updateValueAndValidity();
  }

  incorrectPasswordValidator(): ValidatorFn {
    return control => {
      if (this.incorrectPassword) return { incorrect: true };
      return null;
    };
  }

  onSubmit() {
    if (!this.loading) {
      this.loading = true;
      this.generalError = false;

      this.auth
        .login({
          email: this.email.value.trim(),
          password: this.password.value,
          rememberMe: this.rememberMe.value,
        })
        .subscribe({
          next: () => {
            this.loading = false;
            this.loggedIn.emit();
          },

          error: errors => {
            this.loading = false;

            const gqlErrors = extractGraphQLErrors(errors);

            if (gqlErrors.find(e => e.code === 'USER_NOT_FOUND')) {
              this.emailNotFound = true;
              this.email.markAsTouched();
              this.email.updateValueAndValidity();
            } else if (gqlErrors.find(e => e.code === 'INCORRECT_PASSWORD')) {
              this.incorrectPassword = true;
              this.password.markAsTouched();
              this.password.updateValueAndValidity();
            } else if (gqlErrors.find(e => e.code === 'ACCOUNT_NOT_VERIFIED')) {
              this.accountNeedsVerification = true;
            } else {
              this.generalError = true;
            }
          },
        });
    }
  }
}
