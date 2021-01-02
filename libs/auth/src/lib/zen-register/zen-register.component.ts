import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthRegisterGQL, AuthSession, extractGraphQLErrors } from '@zen/graphql';

import { verticalAccordion } from '../animations';
import { AuthService } from '../auth.service';
import { emailValidator, passwordValidator, usernameValidator } from '../validators';

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
  emailTaken = false;
  generalError = false;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private authRegisterGQL: AuthRegisterGQL
  ) {
    this.form = this.formBuilder.group({
      username: [
        '',
        [Validators.required, this.usernameValidator(), this.usernameTakenValidator()],
      ],
      email: ['', [Validators.required, emailValidator(), this.emailTakenValidator()]],
      password: ['', [this.passwordValidator()]],
      passwordConfirm: ['', [Validators.required, this.passwordConfirmValidator()]],
      acceptTerms: ['', Validators.requiredTrue],
    });
  }

  get username() {
    return this.form.get('username');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get acceptTerms() {
    return this.form.get('acceptTerms');
  }

  usernameTakenReset() {
    this.usernameTaken = false;
    this.email?.updateValueAndValidity();
  }

  usernameTakenValidator(): ValidatorFn {
    return control => {
      if (this.usernameTaken) return { usernameTaken: true };
      return null;
    };
  }

  usernameValidator(): ValidatorFn {
    return control => {
      if (this.form) return usernameValidator(control.value);
      return null;
    };
  }

  emailTakenReset() {
    this.emailTaken = false;
    this.email?.updateValueAndValidity();
  }

  emailTakenValidator(): ValidatorFn {
    return control => {
      if (this.emailTaken) return { emailTaken: true };
      return null;
    };
  }

  passwordValidator(): ValidatorFn {
    return control => {
      if (this.form) {
        this.passwordConfirm?.updateValueAndValidity();
        return passwordValidator(control);
      }
      return null;
    };
  }

  passwordConfirmValidator(): ValidatorFn {
    return control => {
      if (this.form) {
        if (control.value.length >= this.password?.value.length && control.value.length !== 0) {
          control.markAsTouched();
        }
        const notMatching = this.password?.value !== control.value;
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
            username: this.username?.value.trim(),
            email: this.email?.value.trim(),
            password: this.password?.value,
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
              this.username?.markAsTouched();
              this.username?.updateValueAndValidity();
            } else if (gqlErrors.find(e => e.code === 'EMAIL_TAKEN')) {
              this.emailTaken = true;
              this.email?.markAsTouched();
              this.email?.updateValueAndValidity();
            } else {
              this.generalError = true;
            }
          },
        });
    }
  }
}
