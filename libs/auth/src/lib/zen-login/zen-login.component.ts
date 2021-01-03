import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { extractGraphQLErrors } from '@zen/graphql';

import { verticalAccordion } from '../animations';
import { AuthService } from '../auth.service';
import { usernameValidator } from '../validators';

@Component({
  selector: 'zen-login',
  templateUrl: 'zen-login.component.html',
  animations: [...verticalAccordion],
})
export class ZenLoginComponent {
  @Output() loggedIn = new EventEmitter();

  #loading = false;
  #incorrectPassword = false;
  #usernameNotFound = false;
  hidePassword = true;
  form: FormGroup;
  generalError = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
    this.form = this.formBuilder.group({
      username: [
        '',
        [Validators.required, this.usernameValidator(), this.usernameNotFoundValidator()],
      ],
      password: ['', [Validators.required, this.incorrectPasswordValidator()]],
      rememberMe: [false],
    });
  }

  get loading() {
    return this.#loading;
  }

  set loading(value) {
    this.#loading = value;
    if (value) this.form.disable();
    else this.form.enable();
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get rememberMe() {
    return this.form.get('rememberMe');
  }

  usernameNotFoundReset() {
    this.#usernameNotFound = false;
    this.username?.updateValueAndValidity();
  }

  usernameNotFoundValidator(): ValidatorFn {
    return control => (this.#usernameNotFound ? { notFound: true } : null);
  }

  usernameValidator(): ValidatorFn {
    return control => {
      if (this.form) return usernameValidator(control);
      return null;
    };
  }

  incorrectPasswordReset() {
    this.#incorrectPassword = false;
    this.password?.updateValueAndValidity();
  }

  incorrectPasswordValidator(): ValidatorFn {
    return control => (this.#incorrectPassword ? { incorrect: true } : null);
  }

  onSubmit() {
    if (!this.loading) {
      this.loading = true;
      this.generalError = false;
      this.form.disable();

      this.auth
        .login({
          username: this.username?.value.trim(),
          password: this.password?.value,
          rememberMe: this.rememberMe?.value,
        })
        .subscribe({
          next: ({ data }) => {
            this.loading = false;
            this.loggedIn.emit();
          },

          error: errors => {
            this.loading = false;
            this.form.enable();

            const gqlErrors = extractGraphQLErrors(errors);

            if (gqlErrors.find(e => e.code === 'USER_NOT_FOUND')) {
              this.#usernameNotFound = true;
              this.username?.markAsTouched();
              this.username?.updateValueAndValidity();
            }

            if (gqlErrors.find(e => e.code === 'INCORRECT_PASSWORD')) {
              this.#incorrectPassword = true;
              this.password?.markAsTouched();
              this.password?.updateValueAndValidity();
            }

            if (gqlErrors.length === 0) this.generalError = true;
          },
        });
    }
  }
}
