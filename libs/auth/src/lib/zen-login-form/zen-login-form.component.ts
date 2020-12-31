import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { emailValidator } from '@zen/common';
import { extractGraphQLErrors } from '@zen/graphql';

import { verticalAccordion } from '../animations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'zen-login-form',
  templateUrl: 'zen-login-form.component.html',
  animations: [...verticalAccordion],
})
export class ZenLoginFormComponent {
  @Output() loggedIn = new EventEmitter();

  #loading = false;
  #incorrectPassword = false;
  #emailNotFound = false;
  hidePassword = true;
  form: FormGroup;
  generalError = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
    this.form = this.formBuilder.group({
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
    if (value) this.form.disable();
    else this.form.enable();
  }

  get email(): any {
    return this.form.get('email');
  }

  get password(): any {
    return this.form.get('password');
  }

  get rememberMe(): any {
    return this.form.get('rememberMe');
  }

  emailNotFoundReset() {
    this.#emailNotFound = false;
    this.email.updateValueAndValidity();
  }

  emailNotFoundValidator(): ValidatorFn {
    return control => (this.#emailNotFound ? { notFound: true } : null);
  }

  incorrectPasswordReset() {
    this.#incorrectPassword = false;
    this.password.updateValueAndValidity();
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
          email: this.email.value.trim(),
          password: this.password.value,
          rememberMe: this.rememberMe.value,
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
              this.#emailNotFound = true;
              this.email.markAsTouched();
              this.email.updateValueAndValidity();
            } else if (gqlErrors.find(e => e.code === 'INCORRECT_PASSWORD')) {
              this.#incorrectPassword = true;
              this.password.markAsTouched();
              this.password.updateValueAndValidity();
            } else {
              this.generalError = true;
            }
          },
        });
    }
  }
}
