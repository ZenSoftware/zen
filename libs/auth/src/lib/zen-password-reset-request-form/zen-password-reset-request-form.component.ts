import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { ApiConstants } from '@zen/api-interfaces';
import { AuthPasswordResetRequestQueryGQL, GqlErrors } from '@zen/graphql';
import { Subscription } from 'rxjs';

import { verticalAccordion } from '../animations';

@Component({
  selector: 'zen-password-reset-request-form',
  templateUrl: './zen-password-reset-request-form.component.html',
  animations: [...verticalAccordion],
})
export class ZenPasswordResetRequestFormComponent implements AfterViewInit, OnDestroy {
  @ViewChild('emailUsernameMatInput') emailUsernameMatInput?: MatInput;
  @ViewChild('emailUsernameInput') emailUsernameInput?: ElementRef;
  @Output() sent = new EventEmitter();

  #subs: Array<Subscription | undefined> = [];
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
            ApiConstants.USERNAME_MIN_LENGTH < 7 ? ApiConstants.USERNAME_MIN_LENGTH : 7
          ),
          Validators.maxLength(254),
          this.includesSpaceValidator(),
          this.notFoundValidator(),
        ],
      ],
    });

    const sub = this.emailOrUsername?.valueChanges.subscribe(() => {
      this.#notFound = false;
    });
    this.#subs.push(sub);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.emailUsernameMatInput?.focus();
    });
  }

  get emailOrUsername() {
    return this.form.get('emailOrUsername');
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
              emailOrUsername: this.emailOrUsername?.value.trim(),
            },
          },
          { fetchPolicy: 'network-only' }
        )
        .subscribe({
          next: () => {
            this.loading = false;
            this.completed = true;
            this.sent.emit();
          },
          error: errors => {
            this.generalError = true;
            this.loading = false;
            this.form.enable();

            const gqlErrors = new GqlErrors(errors);

            if (gqlErrors.find(e => e.code === 'USER_NOT_FOUND')) {
              this.generalError = false;
              this.#notFound = true;
              this.emailOrUsername?.markAsTouched();
              this.emailOrUsername?.updateValueAndValidity();
              this.emailUsernameInput?.nativeElement.select();
            }
          },
        });
    }
  }

  ngOnDestroy() {
    this.#subs.forEach(s => s?.unsubscribe);
  }
}
