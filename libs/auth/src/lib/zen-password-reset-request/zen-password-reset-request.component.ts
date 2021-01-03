import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ApiConstants } from '@zen/api-interfaces';
import { AuthPasswordResetRequestQueryGQL, extractGraphQLErrors } from '@zen/graphql';

import { verticalAccordion } from '../animations';

@Component({
  selector: 'zen-password-reset-request',
  templateUrl: './zen-password-reset-request.component.html',
  animations: [...verticalAccordion],
})
export class ZenPasswordResetRequestComponent {
  @Output() sent = new EventEmitter();
  @ViewChild('inputTextbox') inputTextbox?: ElementRef;

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
        [
          Validators.required,
          Validators.minLength(
            ApiConstants.USERNAME_MIN_LENGTH < 7 ? ApiConstants.USERNAME_MIN_LENGTH : 7
          ),
          Validators.maxLength(254),
          this.includesSpaceValidator(),
          this.notFoundValidator(),
        ],
      ],
    });
  }

  get emailOrUsername() {
    return this.form.get('emailOrUsername');
  }

  includesSpaceValidator(): ValidatorFn {
    return control => {
      if (control.value && /\s/.test(control.value)) return { includesSpace: true };
      return null;
    };
  }

  notFoundReset() {
    this.notFound = false;
    this.emailOrUsername?.updateValueAndValidity();
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
      this.form.disable();

      this.authPasswordResetRequestQueryGQL
        .fetch(
          {
            data: {
              emailOrUsername: this.emailOrUsername?.value.trim(),
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
            this.form.enable();

            const gqlErrors = extractGraphQLErrors(errors);

            if (gqlErrors.find(e => e.code === 'USER_NOT_FOUND')) {
              this.notFound = true;
              this.emailOrUsername?.markAsTouched();
              this.emailOrUsername?.updateValueAndValidity();
              this.inputTextbox?.nativeElement.focus();
              this.inputTextbox?.nativeElement.select();
            }

            if (gqlErrors.length === 0) this.generalError = true;
          },
        });
    }
  }
}
