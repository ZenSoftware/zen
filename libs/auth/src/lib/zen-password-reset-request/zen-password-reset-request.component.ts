import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthPasswordResetRequestQueryGQL, extractGraphQLErrors } from '@zen/graphql';

import { verticalAccordion } from '../animations';

@Component({
  selector: 'zen-password-reset-request',
  templateUrl: './zen-password-reset-request.component.html',
  animations: [...verticalAccordion],
})
export class ZenPasswordResetRequestComponent {
  @Output() sent = new EventEmitter();

  loading = false;
  completed = false;
  notFound = false;
  form: FormGroup;
  generalError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authPasswordResetRequestQueryGQL: AuthPasswordResetRequestQueryGQL
  ) {
    this.form = this.formBuilder.group({
      emailOrUsername: [
        '',
        [Validators.required, Validators.minLength(3), this.notFoundValidator()],
      ],
    });
  }

  get emailOrUsername(): any {
    return this.form.get('emailOrUsername');
  }

  notFoundReset() {
    this.notFound = false;
    this.emailOrUsername.updateValueAndValidity();
  }

  notFoundValidator(): ValidatorFn {
    return () => {
      if (this.notFound) return { notFound: true };
      return null;
    };
  }

  onSubmit() {
    if (!this.loading) {
      this.loading = true;
      this.generalError = false;

      this.authPasswordResetRequestQueryGQL
        .fetch(
          {
            data: {
              emailOrUsername: this.emailOrUsername.value.trim(),
            },
          },
          { fetchPolicy: 'network-only' }
        )
        .subscribe({
          next: () => {
            this.loading = false;
            this.completed = true;
            this.sent.emit();
          },
          error: errors => {
            this.loading = false;

            const gqlError = extractGraphQLErrors(errors);

            if (gqlError.find(e => e.code === 'USER_NOT_FOUND')) {
              this.notFound = true;
              this.emailOrUsername.markAsTouched();
              this.emailOrUsername.updateValueAndValidity();
            } else {
              this.generalError = true;
            }
          },
        });
    }
  }
}
