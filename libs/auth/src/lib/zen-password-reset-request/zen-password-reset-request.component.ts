import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthPasswordResetRequestQueryGQL, extractGraphQLErrors } from '@zen/graphql';

import { emailValidator } from '../validators';

@Component({
  selector: 'zen-password-reset-request',
  templateUrl: './zen-password-reset-request.component.html',
})
export class ZenPasswordResetRequestComponent {
  @Output() sent = new EventEmitter();

  loading = false;
  completed = false;
  emailNotFound = false;
  passwordForm: FormGroup;
  generalError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authPasswordResetRequestQueryGQL: AuthPasswordResetRequestQueryGQL
  ) {
    this.passwordForm = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator(), this.emailNotFoundValidator()]],
    });
  }

  get email(): any {
    return this.passwordForm.get('email');
  }

  emailNotFoundReset() {
    this.emailNotFound = false;
    this.email.updateValueAndValidity();
  }

  emailNotFoundValidator(): ValidatorFn {
    return () => {
      if (this.emailNotFound) return { notFound: true };
      return null;
    };
  }

  onSubmit() {
    if (!this.loading) {
      this.loading = true;
      this.generalError = false;

      this.authPasswordResetRequestQueryGQL
        .fetch({
          data: {
            email: this.email.value.trim(),
          },
        })
        .subscribe({
          next: () => {
            this.loading = false;
            this.completed = true;
            this.sent.emit();
          },
          error: errors => {
            this.loading = false;

            const gqlError = extractGraphQLErrors(errors);

            if (gqlError.find(e => e.code === 'ALREADY_VERIFIED')) {
              this.emailNotFound = true;
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
