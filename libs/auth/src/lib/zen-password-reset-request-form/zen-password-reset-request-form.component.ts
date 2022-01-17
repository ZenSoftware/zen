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
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ApiConstants, ApiError } from '@zen/api-interfaces';
import { AuthPasswordResetRequestQueryGQL, GqlErrors, parseGqlErrors } from '@zen/graphql';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { verticalAccordion } from '../animations';

const EMAIL_MIN_LENGTH = 6;

@Component({
  selector: 'zen-password-reset-request-form',
  templateUrl: './zen-password-reset-request-form.component.html',
  animations: [...verticalAccordion],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenPasswordResetRequestFormComponent implements AfterViewInit, OnDestroy {
  @ViewChild('emailUsernameInput') emailUsernameInput!: ElementRef<HTMLInputElement>;
  @Output() sent = new EventEmitter();

  #subs: Array<Subscription> = [];
  #notFound = false;
  loading = false;
  completed = false;
  form: FormGroup;
  generalError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authPasswordResetRequestQueryGQL: AuthPasswordResetRequestQueryGQL
  ) {
    this.form = this.formBuilder.group({
      emailOrUsername: [
        '',
        [
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
      ],
    });

    const sub = this.emailOrUsername.valueChanges.subscribe(() => {
      this.#notFound = false;
    });
    this.#subs.push(sub);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.emailUsernameInput.nativeElement.select();
    });
  }

  get emailOrUsername() {
    return this.form.get('emailOrUsername') as FormControl;
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
      this.form.disable();

      this.authPasswordResetRequestQueryGQL
        .fetch(
          {
            data: {
              emailOrUsername: this.emailOrUsername.value.trim(),
            },
          },
          { fetchPolicy: 'network-only' }
        )
        .pipe(catchError(parseGqlErrors))
        .subscribe({
          next: () => {
            this.loading = false;
            this.completed = true;
            this.sent.emit();
          },
          error: (errors: GqlErrors<ApiError.AuthPasswordResetRequest>) => {
            this.generalError = true;
            this.loading = false;
            this.form.enable();

            if (errors.find(e => e === 'USER_NOT_FOUND')) {
              this.generalError = false;
              this.#notFound = true;
              this.emailOrUsername.updateValueAndValidity();
              this.emailUsernameInput.nativeElement.select();
            }
          },
        });
    }
  }

  ngOnDestroy() {
    this.#subs.forEach(s => s.unsubscribe());
  }
}
