import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiConstants } from '@zen/api-interfaces';
import { AuthPasswordResetConfirmationGQL } from '@zen/graphql';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { verticalAccordion } from '../animations';
import { validatePassword } from '../validators';

@Component({
  selector: 'zen-password-reset-confirmation',
  templateUrl: 'zen-password-reset-confirmation.component.html',
  animations: [...verticalAccordion],
})
export class ZenPasswordResetConfirmationComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  ApiConstants = ApiConstants;
  loading = false;
  completed = false;
  generalError = false;
  token: string | null = null;
  form: FormGroup;
  hidePassword = true;

  constructor(
    private authPasswordResetConfirmationGQL: AuthPasswordResetConfirmationGQL,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, this.passwordValidator()]],
      passwordConfirm: ['', [Validators.required, this.passwordConfirmValidator()]],
    });
  }

  ngOnInit() {
    this.subscription = this.route.queryParamMap
      .pipe(map(params => params.get('token')))
      .subscribe(token => (this.token = token));
  }

  get password(): any {
    return this.form.get('password');
  }

  get passwordConfirm(): any {
    return this.form.get('passwordConfirm');
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

      this.authPasswordResetConfirmationGQL
        .mutate({
          data: {
            newPassword: this.password.value,
            token: this.token as string,
          },
        })
        .subscribe({
          next: () => {
            this.loading = false;
            this.completed = true;
            setTimeout(() => this.router.navigateByUrl('/login'), 5000);
          },
          error: errors => {
            this.loading = false;
            this.generalError = true;
            this.form.enable();
          },
        });
    }
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
