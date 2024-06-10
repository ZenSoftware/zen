import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import { ApolloError } from '@apollo/client/errors';
import { Environment } from '@zen/common';
import { ZenLoadingComponent } from '@zen/components';
import { verticalAccordion } from '@zen/components/animations';
import { ApiError, AuthLoginInput } from '@zen/graphql';
import { Subscription, map } from 'rxjs';

import { AuthService } from '../auth.service';
import { ZenPasswordInputComponent, ZenUsernameInputComponent } from '../inputs';

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
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    ZenLoadingComponent,
    ZenPasswordInputComponent,
    ZenUsernameInputComponent,
  ],
})
export class ZenLoginFormComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('usernameInput') usernameInput!: ZenUsernameInputComponent;
  @ViewChild('passwordInput') passwordInput!: ZenPasswordInputComponent;
  @Input() doneMessageVisible = true;
  @Output() loggedIn = new EventEmitter();

  #subs: Subscription[] = [];
  loading = false;
  done = false;
  generalError = false;
  emailTakenError = false;
  form = new FormGroup<FormType>({
    username: new FormControl(),
    password: new FormControl(),
    rememberMe: new FormControl(false, { nonNullable: true }),
  });

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    public env: Environment
  ) {}

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
      this.usernameInput.select();
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
              this.passwordInput.customErrorMessage = 'Incorrect password';
              this.passwordInput.select();
            } else if (error.message === ApiError.Codes.USER_NOT_FOUND) {
              this.generalError = false;
              this.usernameInput.customErrorMessage = 'User not found';
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
