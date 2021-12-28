import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ApiError,
  AuthPasswordResetConfirmationGQL,
  AuthSession,
  GqlErrors,
  parseGqlErrors,
} from '@zen/graphql';
import { Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { verticalAccordion } from '../animations';
import { AuthService } from '../auth.service';
import { passwordValidator } from '../validators';

@Component({
  selector: 'zen-password-reset-confirmation-form',
  templateUrl: 'zen-password-reset-confirmation-form.component.html',
  animations: [...verticalAccordion],
})
export class ZenPasswordResetConfirmationFormComponent implements AfterViewInit, OnDestroy {
  @ViewChild('passwordInput') passwordInput?: ElementRef<HTMLInputElement>;
  @Output() confirmed = new EventEmitter();

  #subs: Array<Subscription | undefined> = [];
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
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, this.passwordValidator()]],
      passwordConfirm: ['', [Validators.required, this.passwordConfirmValidator()]],
    });

    const sub = this.route.queryParamMap
      .pipe(map(params => params.get('token')))
      .subscribe(token => (this.token = token));
    this.#subs.push(sub);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.passwordInput?.nativeElement.select();
    });
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm') as FormControl;
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

      this.authPasswordResetConfirmationGQL
        .mutate({
          data: {
            newPassword: this.password?.value,
            token: this.token as string,
          },
        })
        .pipe(catchError(parseGqlErrors))
        .subscribe({
          next: ({ data }) => {
            this.loading = false;
            this.completed = true;
            this.auth.setSession(data?.authPasswordResetConfirmation as AuthSession);

            setTimeout(() => {
              this.router.navigateByUrl('/');
              this.confirmed.emit();
            }, 5000);
          },
          error: (errors: GqlErrors<ApiError.AuthPasswordResetConfirmation>) => {
            this.loading = false;
            this.generalError = true;
            this.form.enable();
          },
        });
    }
  }

  ngOnDestroy() {
    this.#subs.forEach(s => s?.unsubscribe());
  }
}
