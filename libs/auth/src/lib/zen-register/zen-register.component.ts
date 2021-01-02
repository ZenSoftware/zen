import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthRegisterGQL, AuthSession, extractGraphQLErrors } from '@zen/graphql';

import { verticalAccordion } from '../animations';
import { AuthService } from '../auth.service';
import { emailValidator, validatePassword } from '../validators';

@Component({
  selector: 'zen-register',
  templateUrl: 'zen-register.component.html',
  animations: [...verticalAccordion],
})
export class ZenRegisterComponent {
  @Output() registered = new EventEmitter();

  form: FormGroup;
  loading = false;
  usernameTaken = false;
  generalError = false;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private authRegisterGQL: AuthRegisterGQL
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, this.usernameTakenValidator()]],
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, this.passwordValidator()]],
      passwordConfirm: ['', [Validators.required, this.passwordConfirmValidator()]],
      acceptTerms: ['', Validators.requiredTrue],
    });
  }

  get username(): any {
    return this.form.get('username');
  }

  get email(): any {
    return this.form.get('email');
  }

  get password(): any {
    return this.form.get('password');
  }

  get passwordConfirm(): any {
    return this.form.get('passwordConfirm');
  }

  get acceptTerms(): any {
    return this.form.get('acceptTerms');
  }

  usernameTakenReset() {
    this.usernameTaken = false;
    this.email.updateValueAndValidity();
  }

  usernameTakenValidator(): ValidatorFn {
    return control => {
      if (this.usernameTaken) return { usernameTaken: true };
      return null;
    };
  }

  passwordValidator(): ValidatorFn {
    return control => {
      if (this.form) {
        this.passwordConfirm.updateValueAndValidity();
        return validatePassword(control.value);
      }
      return null;
    };
  }

  passwordConfirmValidator(): ValidatorFn {
    return control => {
      if (this.form) {
        if (control.value.length >= this.password.value.length && control.value.length !== 0) {
          control.markAsTouched();
        }
        const notMatching = this.password.value !== control.value;
        return notMatching ? { notMatching: true } : null;
      }
      return null;
    };
  }

  onSubmit() {
    if (!this.loading) {
      this.loading = true;
      this.generalError = false;
      this.form.disable();

      this.authRegisterGQL
        .mutate({
          data: {
            username: this.username.value.trim(),
            email: this.email.value.trim(),
            password: this.password.value,
          },
        })
        .subscribe({
          next: ({ data }) => {
            this.loading = false;
            this.auth.setSession(data?.authRegister as AuthSession);
            this.registered.emit();
          },

          error: errors => {
            this.loading = false;
            this.form.enable();

            const gqlErrors = extractGraphQLErrors(errors);

            if (gqlErrors.find(e => e.code === 'USERNAME_TAKEN')) {
              this.usernameTaken = true;
              this.username.markAsTouched();
              this.username.updateValueAndValidity();
            } else {
              this.generalError = true;
            }
          },
        });
    }
  }
}
