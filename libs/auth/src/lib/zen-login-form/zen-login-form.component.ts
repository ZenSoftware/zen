import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { ApiError, GqlErrors } from '@zen/graphql';
import { Subscription } from 'rxjs';

import { verticalAccordion } from '../animations';
import { AuthService } from '../auth.service';
import { usernameValidator } from '../validators';

@Component({
  selector: 'zen-login-form',
  templateUrl: 'zen-login-form.component.html',
  animations: [...verticalAccordion],
})
export class ZenLoginFormComponent implements AfterViewInit, OnDestroy {
  @ViewChild('usernameMatInput') usernameMatInput?: MatInput;
  @ViewChild('usernameInput') usernameInput?: ElementRef;
  @ViewChild('passwordInput') passwordInput?: ElementRef;
  @Input() doneMessage = 'Redirecting...';
  @Input() enableDoneSection = true;
  @Output() loggedIn = new EventEmitter();

  #subs: Array<Subscription | undefined> = [];
  #incorrectPassword = false;
  #usernameNotFound = false;
  loading = false;
  done = false;
  hidePassword = true;
  form: FormGroup;
  generalError = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
    this.form = this.formBuilder.group({
      username: [
        '',
        [Validators.required, this.usernameValidator(), this.usernameNotFoundValidator()],
      ],
      password: ['', [Validators.required, this.incorrectPasswordValidator()]],
      rememberMe: [false],
    });

    const sub1 = this.username?.valueChanges.subscribe(() => {
      this.#usernameNotFound = false;
    });
    this.#subs.push(sub1);

    const sub2 = this.password?.valueChanges.subscribe(() => {
      this.#incorrectPassword = false;
    });
    this.#subs.push(sub2);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.usernameMatInput?.focus();
    });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get rememberMe() {
    return this.form.get('rememberMe');
  }

  usernameValidator(): ValidatorFn {
    return control => {
      if (this.form) return usernameValidator(control);
      return null;
    };
  }

  usernameNotFoundValidator(): ValidatorFn {
    return control => (this.#usernameNotFound ? { notFound: true } : null);
  }

  incorrectPasswordValidator(): ValidatorFn {
    return control => (this.#incorrectPassword ? { incorrect: true } : null);
  }

  onSubmit() {
    if (!this.loading) {
      this.loading = true;
      this.generalError = false;
      this.form.disable();

      this.auth
        .login({
          username: this.username?.value.trim(),
          password: this.password?.value,
          rememberMe: this.rememberMe?.value,
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

            if (errors.find(e => e.code === 'INCORRECT_PASSWORD')) {
              this.generalError = false;
              this.#incorrectPassword = true;
              this.password?.updateValueAndValidity();
              this.passwordInput?.nativeElement.select();
            }

            if (errors.find(e => e.code === 'USER_NOT_FOUND')) {
              this.generalError = false;
              this.#usernameNotFound = true;
              this.username?.updateValueAndValidity();
              this.usernameInput?.nativeElement.select();
            }

            if (errors.hasThrottleError) {
              this.generalError = true;
            }
          },
        });
    }
  }

  ngOnDestroy() {
    this.#subs.forEach(s => s?.unsubscribe);
  }
}
