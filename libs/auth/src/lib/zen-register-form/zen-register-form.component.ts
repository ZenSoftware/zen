import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Environment } from '@zen/common';
import {
  ApiError,
  AuthRegister,
  AuthRegisterGQL,
  AuthRegisterInput,
  AuthSession,
  GqlErrors,
  parseGqlErrors,
} from '@zen/graphql';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { verticalAccordion } from '../animations';
import { AuthService } from '../auth.service';
import { emailValidator, passwordValidatorFn, usernameValidator } from '../validators';

interface FormType {
  username: FormControl<AuthRegisterInput['username']>;
  email: FormControl<AuthRegisterInput['email']>;
  password: FormControl<AuthRegisterInput['password']>;
  passwordConfirm: FormControl<AuthRegisterInput['password']>;
  acceptTerms: FormControl<boolean>;
}

@Component({
  selector: 'zen-register-form',
  templateUrl: 'zen-register-form.component.html',
  animations: [...verticalAccordion],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenRegisterFormComponent implements AfterViewInit, OnDestroy {
  @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  @Output() registered = new EventEmitter<AuthSession>();

  #subs: Subscription[] = [];
  #usernameTaken = false;
  #emailTaken = false;
  loading = false;
  generalError = false;
  hidePassword = true;
  form = new FormGroup<FormType>({
    username: new FormControl('', {
      validators: [Validators.required, usernameValidator(), this.usernameTakenValidator()],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, emailValidator(), this.emailTakenValidator()],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, this.passwordValidator()],
      nonNullable: true,
    }),
    passwordConfirm: new FormControl('', {
      validators: [Validators.required, this.passwordConfirmValidator()],
      nonNullable: true,
    }),
    acceptTerms: new FormControl(false, {
      validators: [Validators.requiredTrue],
      nonNullable: true,
    }),
  });

  constructor(
    private auth: AuthService,
    private authRegisterGQL: AuthRegisterGQL,
    public env: Environment
  ) {
    const sub1 = this.username.valueChanges.subscribe(() => {
      this.#usernameTaken = false;
    });
    this.#subs.push(sub1);

    const sub2 = this.email.valueChanges.subscribe(() => {
      this.#emailTaken = false;
    });
    this.#subs.push(sub2);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.usernameInput.nativeElement.select();
    });
  }

  get username() {
    return this.form.get('username') as FormType['username'];
  }

  get email() {
    return this.form.get('email') as FormType['email'];
  }

  get password() {
    return this.form.get('password') as FormType['password'];
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm') as FormType['passwordConfirm'];
  }

  get acceptTerms() {
    return this.form.get('acceptTerms') as FormType['acceptTerms'];
  }

  usernameTakenValidator(): ValidatorFn {
    return () => {
      if (this.#usernameTaken) return { usernameTaken: true };
      return null;
    };
  }

  emailTakenValidator(): ValidatorFn {
    return () => {
      if (this.#emailTaken) return { emailTaken: true };
      return null;
    };
  }

  passwordValidator(): ValidatorFn {
    return control => {
      if (this.form) {
        this.passwordConfirm.updateValueAndValidity();
        return passwordValidatorFn(control);
      }
      return null;
    };
  }

  passwordConfirmValidator(): ValidatorFn {
    return control => {
      if (this.form) {
        const notMatching = control.value && this.password.value !== control.value;
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
        .mutate(
          {
            data: {
              username: this.username.value.trim(),
              email: this.email.value.trim(),
              password: this.password.value,
            },
          },
          { fetchPolicy: 'no-cache' }
        )
        .pipe(catchError(parseGqlErrors))
        .subscribe({
          next: ({ data }) => {
            this.loading = false;
            this.registered.emit((<AuthRegister>data).authRegister);
          },

          error: (errors: GqlErrors<ApiError.AuthRegister>) => {
            this.loading = false;
            this.form.enable();

            this.generalError = true;

            if (errors.find(e => e === 'EMAIL_TAKEN')) {
              this.generalError = false;
              this.#emailTaken = true;
              this.email.updateValueAndValidity();
              this.emailInput.nativeElement.select();
            }

            if (errors.find(e => e === 'USERNAME_TAKEN')) {
              this.generalError = false;
              this.#usernameTaken = true;
              this.username.updateValueAndValidity();
              this.usernameInput.nativeElement.select();
            }
          },
        });

      this.form.disable();
    }
  }

  loginWithGoogle() {
    this.loading = true;
    this.form.disable();
    this.auth.loginWithGoogle();
  }

  ngOnDestroy() {
    this.#subs.forEach(s => s.unsubscribe());
  }
}
