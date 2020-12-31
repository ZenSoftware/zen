import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthRegisterGQL, AuthSession, extractGraphQLErrors } from '@zen/graphql';

import { verticalAccordionEnter } from '../animations';
import { AuthService } from '../auth.service';
import { emailValidator, validatePassword } from '../validators';

@Component({
  selector: 'zen-register-form',
  templateUrl: 'zen-register-form.component.html',
  animations: [trigger('accordion', [transition(':enter', useAnimation(verticalAccordionEnter))])],
})
export class ZenRegisterFormComponent {
  @Output() registered = new EventEmitter();

  form: FormGroup;
  loading = false;
  emailTaken = false;
  generalError = false;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private authRegisterGQL: AuthRegisterGQL
  ) {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      email: ['', [Validators.required, emailValidator(), this.emailTakenValidator()]],
      password: ['', [Validators.required, this.passwordValidator()]],
      passwordConfirm: ['', [Validators.required, this.passwordConfirmValidator()]],
      acceptTerms: ['', Validators.requiredTrue],
    });
  }

  get firstName(): any {
    return this.form.get('firstName');
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

  emailTakenReset() {
    this.emailTaken = false;
    this.email.updateValueAndValidity();
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
            firstName: this.firstName.value.trim(),
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

            if (gqlErrors.find(e => e.code === 'EMAIL_TAKEN')) {
              this.emailTaken = true;
              this.email.markAsTouched();
              this.email.updateValueAndValidity();
            } else {
              this.generalError = true;
            }
          },
        });
    }
  }
}
