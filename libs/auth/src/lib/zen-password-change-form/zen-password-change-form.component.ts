import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiConstants } from '@zen/api-interfaces';
import { AuthPasswordChangeGQL, GqlErrors } from '@zen/graphql';

import { verticalAccordion } from '../animations';
import { passwordValidator } from '../validators';

@Component({
  selector: 'zen-password-change-form',
  templateUrl: 'zen-password-change-form.component.html',
  animations: [...verticalAccordion],
})
export class ZenPasswordChangeFormComponent {
  @Output() changed = new EventEmitter();
  @ViewChild('oldPasswordInput') oldPasswordInput?: ElementRef;

  ApiConstants = ApiConstants;
  loading = false;
  completed = false;
  generalError = false;
  form: FormGroup;
  hidePassword = true;
  incorrectPassword = false;

  constructor(
    private authPasswordChangeGQL: AuthPasswordChangeGQL,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      oldPassword: ['', [Validators.required, this.incorrectPasswordValidator()]],
      newPassword: ['', [Validators.required, this.passwordValidator()]],
      passwordConfirm: ['', [Validators.required, this.passwordConfirmValidator()]],
    });
  }

  get oldPassword() {
    return this.form.get('oldPassword');
  }

  get newPassword() {
    return this.form.get('newPassword');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  passwordValidator(): ValidatorFn {
    return control => {
      if (this.form) {
        return passwordValidator(control);
      }
      return null;
    };
  }

  passwordConfirmValidator(): ValidatorFn {
    return control => {
      if (this.form) {
        if (
          control.value.length >= this.newPassword?.value.length &&
          control.value.length !== 0
        ) {
          control.markAsTouched();
        }
        const notMatching = this.newPassword?.value !== control.value;
        return notMatching ? { notMatching: true } : null;
      }
      return null;
    };
  }

  incorrectPasswordReset() {
    this.incorrectPassword = false;
    this.oldPassword?.updateValueAndValidity();
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
      this.form.disable();

      this.authPasswordChangeGQL
        .mutate({
          data: {
            newPassword: this.newPassword?.value,
            oldPassword: this.oldPassword?.value,
          },
        })
        .subscribe({
          next: () => {
            this.loading = false;
            this.completed = true;
            this.changed.emit();
          },
          error: errors => {
            this.generalError = true;
            this.loading = false;
            this.form.enable();

            const gqlErrors = new GqlErrors(errors);

            if (gqlErrors.find(e => e.code === 'WRONG_PASSWORD')) {
              this.generalError = false;
              this.incorrectPassword = true;
              this.oldPassword?.markAsTouched();
              this.oldPassword?.updateValueAndValidity();
              this.oldPasswordInput?.nativeElement.select();
            }
          },
        });
    }
  }
}
