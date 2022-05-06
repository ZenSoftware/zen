import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiError, AuthPasswordChangeGQL, GqlErrors, parseGqlErrors } from '@zen/graphql';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { verticalAccordion } from '../animations';
import { passwordValidator } from '../validators';

@Component({
  selector: 'zen-password-change-form',
  templateUrl: 'zen-password-change-form.component.html',
  animations: [...verticalAccordion],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenPasswordChangeFormComponent implements OnDestroy {
  @ViewChild('oldPasswordInput') oldPasswordInput!: ElementRef<HTMLInputElement>;
  @Output() changed = new EventEmitter();

  #subs: Subscription[] = [];
  #incorrectPassword = false;
  loading = false;
  completed = false;
  generalError = false;
  form: FormGroup;
  hidePassword = true;

  constructor(
    private authPasswordChangeGQL: AuthPasswordChangeGQL,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      oldPassword: ['', [Validators.required, this.incorrectPasswordValidator()]],
      newPassword: ['', [Validators.required, this.passwordValidator()]],
      passwordConfirm: ['', [Validators.required, this.passwordConfirmValidator()]],
    });

    const sub = this.oldPassword.valueChanges.subscribe(() => {
      this.#incorrectPassword = false;
      this.newPassword.updateValueAndValidity();
    });
    this.#subs.push(sub);
  }

  get oldPassword() {
    return this.form.get('oldPassword') as FormControl;
  }

  get newPassword() {
    return this.form.get('newPassword') as FormControl;
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm') as FormControl;
  }

  passwordValidator(): ValidatorFn {
    return control => {
      if (this.form) {
        this.passwordConfirm.updateValueAndValidity();

        let errors: any = passwordValidator(control);

        if (this.newPassword.value && this.oldPassword.value === this.newPassword.value) {
          if (errors) errors.oldEqualsNew = true;
          else errors = { oldEqualsNew: true };
        }

        return errors;
      }
      return null;
    };
  }

  passwordConfirmValidator(): ValidatorFn {
    return control => {
      if (this.form) {
        const notMatching = control.value && this.newPassword.value !== control.value;
        return notMatching ? { notMatching: true } : null;
      }
      return null;
    };
  }

  incorrectPasswordValidator(): ValidatorFn {
    return () => {
      if (this.#incorrectPassword) return { incorrect: true };
      return null;
    };
  }

  changeAgain() {
    this.completed = false;
    this.form.reset();
    this.form.enable();
    setTimeout(() => this.oldPasswordInput.nativeElement.select());
  }

  onSubmit() {
    if (!this.loading) {
      this.loading = true;
      this.generalError = false;
      this.form.disable();

      this.authPasswordChangeGQL
        .mutate(
          {
            data: {
              oldPassword: this.oldPassword.value,
              newPassword: this.newPassword.value,
            },
          },
          { fetchPolicy: 'no-cache' }
        )
        .pipe(catchError(parseGqlErrors))
        .subscribe({
          next: () => {
            this.loading = false;
            this.completed = true;
            this.changed.emit();
          },
          error: (errors: GqlErrors<ApiError.AuthPasswordChange>) => {
            this.generalError = true;
            this.loading = false;
            this.form.enable();

            if (errors.find(e => e === 'WRONG_PASSWORD')) {
              this.generalError = false;
              this.#incorrectPassword = true;
              this.oldPassword.updateValueAndValidity();
              this.oldPasswordInput.nativeElement.select();
            }
          },
        });
    }
  }

  ngOnDestroy() {
    this.#subs.map(s => s.unsubscribe());
  }
}
