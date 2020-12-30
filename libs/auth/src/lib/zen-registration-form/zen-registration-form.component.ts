import { transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthRegisterGQL, extractGraphQLErrors } from '@zen/graphql';

import { verticalAccordionEnter, verticalAccordionLeave } from '../animations';
import { emailValidator, validatePassword } from '../validators';

@Component({
  selector: 'zen-registration-form',
  templateUrl: 'zen-registration-form.component.html',
  animations: [
    trigger('accordion', [
      transition(':enter', useAnimation(verticalAccordionEnter)),
      transition(':leave', useAnimation(verticalAccordionLeave)),
    ]),
    trigger('accordionLeave', [transition(':leave', useAnimation(verticalAccordionLeave))]),
  ],
})
export class ZenRegistrationFormComponent {
  registrationForm: FormGroup;
  completed = false;
  loading = false;
  emailTaken = false;
  generalError = false;

  constructor(private formBuilder: FormBuilder, private authRegisterGQL: AuthRegisterGQL) {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      email: ['', [Validators.required, emailValidator(), this.emailTakenValidator()]],
      password: ['', [Validators.required, this.passwordValidator()]],
      passwordConfirm: ['', [Validators.required, this.passwordConfirmValidator()]],
      acceptTerms: ['', Validators.requiredTrue],
    });
  }

  get firstName(): any {
    return this.registrationForm.get('firstName');
  }

  get email(): any {
    return this.registrationForm.get('email');
  }

  get password(): any {
    return this.registrationForm.get('password');
  }

  get passwordConfirm(): any {
    return this.registrationForm.get('passwordConfirm');
  }

  get acceptTerms(): any {
    return this.registrationForm.get('acceptTerms');
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
      if (this.registrationForm) {
        this.passwordConfirm.updateValueAndValidity();
        return validatePassword(control.value);
      }
      return null;
    };
  }

  passwordConfirmValidator(): ValidatorFn {
    return control => {
      if (this.registrationForm) {
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

      this.authRegisterGQL
        .mutate({
          data: {
            firstName: this.firstName.value.trim(),
            email: this.email.value.trim(),
            password: this.password.value,
          },
        })
        .subscribe({
          next: () => {
            this.loading = false;
            this.completed = true;
          },

          error: errors => {
            const gqlErrors = extractGraphQLErrors(errors);

            if (gqlErrors.find(e => e.code === 'EMAIL_TAKEN')) {
              this.emailTaken = true;
              this.email.markAsTouched();
              this.email.updateValueAndValidity();
            } else {
              this.generalError = true;
            }

            this.loading = false;
          },
        });
    }
  }
}
