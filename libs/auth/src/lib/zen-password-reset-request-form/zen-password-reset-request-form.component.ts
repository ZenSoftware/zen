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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApolloError } from '@apollo/client/errors';
import { ApiConstants, ApiError } from '@zen/common';
import { ZenLoadingComponent } from '@zen/components';
import { verticalAccordion } from '@zen/components/animations';
import { AuthPasswordResetRequestInput, AuthPasswordResetRequestQueryGQL } from '@zen/graphql';
import { Subscription } from 'rxjs';

const EMAIL_MIN_LENGTH = 6;

interface FormType {
  emailOrUsername: FormControl<AuthPasswordResetRequestInput['emailOrUsername']>;
}

@Component({
  selector: 'zen-password-reset-request-form',
  templateUrl: './zen-password-reset-request-form.component.html',
  animations: [...verticalAccordion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ZenLoadingComponent,
  ],
})
export class ZenPasswordResetRequestFormComponent implements AfterContentInit, OnDestroy {
  @ViewChild('emailUsernameInput') emailUsernameInput!: ElementRef<HTMLInputElement>;
  @Output() sent = new EventEmitter();

  #subs: Subscription[] = [];
  #notFound = false;
  loading = false;
  completed = false;
  generalError = false;
  form = new FormGroup<FormType>({
    emailOrUsername: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(
          ApiConstants.USERNAME_MIN_LENGTH < EMAIL_MIN_LENGTH
            ? ApiConstants.USERNAME_MIN_LENGTH
            : EMAIL_MIN_LENGTH
        ),
        Validators.maxLength(254),
        this.includesSpaceValidator(),
        this.notFoundValidator(),
      ],
      nonNullable: true,
    }),
  });

  constructor(private authPasswordResetRequestQueryGQL: AuthPasswordResetRequestQueryGQL) {
    const sub = this.emailOrUsername.valueChanges.subscribe(() => {
      this.#notFound = false;
    });
    this.#subs.push(sub);
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.emailUsernameInput.nativeElement.select();
    });
  }

  get emailOrUsername() {
    return this.form.get('emailOrUsername') as FormType['emailOrUsername'];
  }

  includesSpaceValidator(): ValidatorFn {
    return control => {
      if (control.value && /\s/.test(control.value)) return { includesSpace: true };
      return null;
    };
  }

  notFoundValidator(): ValidatorFn {
    return () => {
      if (this.#notFound) return { notFound: true };
      return null;
    };
  }

  onSubmit() {
    if (!this.loading) {
      this.loading = true;
      this.generalError = false;

      this.authPasswordResetRequestQueryGQL
        .fetch(
          {
            data: {
              emailOrUsername: this.emailOrUsername.value.trim(),
            },
          },
          { fetchPolicy: 'no-cache' }
        )
        .subscribe({
          next: () => {
            this.loading = false;
            this.completed = true;
            this.sent.emit();
          },
          error: (error: ApolloError) => {
            this.generalError = true;
            this.loading = false;
            this.form.enable();

            if (error.message === ApiError.Codes.USER_NOT_FOUND) {
              this.generalError = false;
              this.#notFound = true;
              this.emailOrUsername.updateValueAndValidity();
              this.emailUsernameInput.nativeElement.select();
            }
          },
        });

      this.form.disable();
    }
  }

  ngOnDestroy() {
    this.#subs.forEach(s => s.unsubscribe());
  }
}
