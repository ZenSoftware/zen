import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Environment } from '@zen/common';
import { ApiError, GqlErrors } from '@zen/graphql';
import { Subscription } from 'rxjs';

import { verticalAccordion } from '../animations';
import { AuthService } from '../auth.service';
import { usernameValidator } from '../validators';

@Component({
  selector: 'zen-login-form',
  templateUrl: 'zen-login-form.component.html',
  animations: [...verticalAccordion],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenLoginFormComponent implements OnDestroy {
  @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  @Input() doneMessage = 'Redirecting...';
  @Input() enableDoneSection = true;
  @Output() loggedIn = new EventEmitter();

  #subs: Subscription[] = [];
  #incorrectPassword = false;
  #usernameNotFound = false;
  loading = false;
  done = false;
  hidePassword = true;
  form: UntypedFormGroup;
  generalError = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private auth: AuthService,
    public env: Environment
  ) {
    this.form = this.formBuilder.group({
      username: [
        '',
        [Validators.required, this.usernameValidator(), this.usernameNotFoundValidator()],
      ],
      password: ['', [Validators.required, this.incorrectPasswordValidator()]],
      rememberMe: [false],
    });

    const sub1 = this.username.valueChanges.subscribe(() => {
      this.#usernameNotFound = false;
    });
    this.#subs.push(sub1);

    const sub2 = this.password.valueChanges.subscribe(() => {
      this.#incorrectPassword = false;
    });
    this.#subs.push(sub2);
  }

  get username() {
    return this.form.get('username') as UntypedFormControl;
  }

  get password() {
    return this.form.get('password') as UntypedFormControl;
  }

  get rememberMe() {
    return this.form.get('rememberMe') as UntypedFormControl;
  }

  usernameValidator(): ValidatorFn {
    return control => {
      if (this.form) return usernameValidator(control);
      return null;
    };
  }

  usernameNotFoundValidator(): ValidatorFn {
    return () => (this.#usernameNotFound ? { notFound: true } : null);
  }

  incorrectPasswordValidator(): ValidatorFn {
    return () => (this.#incorrectPassword ? { incorrect: true } : null);
  }

  onSubmit() {
    if (!this.loading) {
      this.loading = true;
      this.generalError = false;
      this.form.disable();

      this.auth
        .login({
          username: this.username.value.trim(),
          password: this.password.value,
          rememberMe: this.rememberMe.value,
        })
        .subscribe({
          next: () => {
            this.loading = false;
            this.done = true;
            this.loggedIn.emit();
          },

          error: (errors: GqlErrors<ApiError.AuthLogin>) => {
            this.loading = false;
            this.generalError = true;
            this.form.enable();

            if (errors.find(e => e === 'INCORRECT_PASSWORD')) {
              this.generalError = false;
              this.#incorrectPassword = true;
              this.password.updateValueAndValidity();
              this.passwordInput.nativeElement.select();
            }

            if (errors.find(e => e === 'USER_NOT_FOUND')) {
              this.generalError = false;
              this.#usernameNotFound = true;
              this.username.updateValueAndValidity();
              this.usernameInput.nativeElement.select();
            }
          },
        });
    }
  }

  loginWithGoogle() {
    this.loading = true;
    this.form.disable();
    this.auth.loginWithGoogle();
  }

  ngOnDestroy() {
    this.#subs.map(s => s.unsubscribe());
  }
}
