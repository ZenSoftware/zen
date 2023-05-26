import { NgIf } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ApolloError } from '@apollo/client/errors';
import { Environment } from '@zen/common';
import { ZenLoadingComponent } from '@zen/components';
import {
  ApiError,
  AuthRegister,
  AuthRegisterGQL,
  AuthRegisterInput,
  AuthSession,
} from '@zen/graphql';
import { Subscription } from 'rxjs';

import { verticalAccordion } from '../animations';
import { AuthService } from '../auth.service';
import { ZenUsernameInputComponent } from '../inputs';
import { emailValidator, passwordValidatorFn } from '../validators';

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
  standalone: true,
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgIf,
    ReactiveFormsModule,
    ZenLoadingComponent,
    ZenUsernameInputComponent,
  ],
})
export class ZenRegisterFormComponent implements AfterContentInit, OnDestroy {
  @ViewChild('usernameInput') usernameInput!: ZenUsernameInputComponent;
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  @Output() registered = new EventEmitter<AuthSession>();

  #subs: Subscription[] = [];
  #emailTaken = false;
  loading = false;
  generalError = false;
  hidePassword = true;
  form = new FormGroup<FormType>({
    username: new FormControl(),
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
    const sub2 = this.email.valueChanges.subscribe(() => {
      this.#emailTaken = false;
    });
    this.#subs.push(sub2);
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.usernameInput.select();
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
        .subscribe({
          next: ({ data }) => {
            this.loading = false;
            this.registered.emit((<AuthRegister>data).authRegister);
          },

          error: (error: ApolloError) => {
            this.loading = false;
            this.form.enable();

            this.generalError = true;

            if (error.message === ApiError.AuthRegister.EMAIL_TAKEN) {
              this.generalError = false;
              this.#emailTaken = true;
              this.email.updateValueAndValidity();
              this.emailInput.nativeElement.select();
            } else if (error.message === ApiError.AuthRegister.USERNAME_TAKEN) {
              this.generalError = false;
              this.usernameInput.usernameTaken = true;
              this.usernameInput.select();
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
