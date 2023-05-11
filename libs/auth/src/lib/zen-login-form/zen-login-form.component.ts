import { NgIf } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import { ApolloError } from '@apollo/client/errors';
import { Environment } from '@zen/common';
import { ZenLoadingComponent } from '@zen/components';
import { ApiError, AuthLoginInput } from '@zen/graphql';
import { Subscription, map } from 'rxjs';

import { verticalAccordion } from '../animations';
import { AuthService } from '../auth.service';
import { usernameValidator } from '../validators';

interface FormType {
  username: FormControl<AuthLoginInput['username']>;
  password: FormControl<AuthLoginInput['password']>;
  rememberMe: FormControl<AuthLoginInput['rememberMe']>;
}

@Component({
  selector: 'zen-login-form',
  templateUrl: 'zen-login-form.component.html',
  animations: [...verticalAccordion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    NgIf,
    ReactiveFormsModule,
    ZenLoadingComponent,
  ],
})
export class ZenLoginFormComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  @Input() doneMessage = 'Redirecting...';
  @Input() doneMessageVisible = true;
  @Output() loggedIn = new EventEmitter();

  #subs: Subscription[] = [];
  #incorrectPassword = false;
  #usernameNotFound = false;
  loading = false;
  done = false;
  hidePassword = true;
  generalError = false;
  emailTakenError = false;
  form = new FormGroup<FormType>({
    username: new FormControl('', {
      validators: [Validators.required, usernameValidator(), this.usernameNotFoundValidator()],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, this.incorrectPasswordValidator()],
      nonNullable: true,
    }),
    rememberMe: new FormControl(false, { nonNullable: true }),
  });

  constructor(private route: ActivatedRoute, private auth: AuthService, public env: Environment) {
    const sub1 = this.username.valueChanges.subscribe(() => {
      this.#usernameNotFound = false;
    });
    this.#subs.push(sub1);

    const sub2 = this.password.valueChanges.subscribe(() => {
      this.#incorrectPassword = false;
    });
    this.#subs.push(sub2);
  }

  ngOnInit(): void {
    const sub = this.route.queryParamMap
      .pipe(map(p => p.get('email_taken') === 'true'))
      .subscribe(emailTaken => {
        this.emailTakenError = emailTaken;
      });
    this.#subs.push(sub);
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.usernameInput.nativeElement.select();
    });
  }

  get username() {
    return this.form.get('username') as FormType['username'];
  }

  get password() {
    return this.form.get('password') as FormType['password'];
  }

  get rememberMe() {
    return this.form.get('rememberMe') as FormType['rememberMe'];
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

      this.auth
        .login({
          username: this.username.value,
          password: this.password.value,
          rememberMe: this.rememberMe.value,
        })
        .subscribe({
          next: () => {
            this.loading = false;
            this.done = true;
            this.loggedIn.emit();
          },

          error: (error: ApolloError) => {
            this.loading = false;
            this.generalError = true;
            this.form.enable();

            if (error.message === ApiError.AuthLogin.INCORRECT_PASSWORD) {
              this.generalError = false;
              this.#incorrectPassword = true;
              this.password.updateValueAndValidity();
              this.passwordInput.nativeElement.select();
            } else if (error.message === ApiError.AuthLogin.USER_NOT_FOUND) {
              this.generalError = false;
              this.#usernameNotFound = true;
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
