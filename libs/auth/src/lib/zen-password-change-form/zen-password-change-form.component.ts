import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthPasswordChangeGQL, GqlErrors, parseGqlErrors } from '@zen/graphql';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { verticalAccordion } from '../animations';
import { passwordValidator } from '../validators';

@Component({
  selector: 'zen-password-change-form',
  templateUrl: 'zen-password-change-form.component.html',
  animations: [...verticalAccordion],
})
export class ZenPasswordChangeFormComponent implements OnDestroy {
  @ViewChild('oldPasswordMatInput') oldPasswordMatInput?: MatInput;
  @ViewChild('oldPasswordInput') oldPasswordInput?: ElementRef;
  @Output() changed = new EventEmitter();

  #subs: Array<Subscription | undefined> = [];
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

    const sub = this.oldPassword?.valueChanges.subscribe(() => {
      this.#incorrectPassword = false;
      this.newPassword?.updateValueAndValidity();
    });
    this.#subs.push(sub);
  }

  get oldPassword() {
    return this.form.get('oldPassword');
  }

  get newPassword() {
    return this.form.get('newPassword');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  passwordValidator(): ValidatorFn {
    return control => {
      if (this.form) {
        this.passwordConfirm?.updateValueAndValidity();

        let errors: any = passwordValidator(control);

        if (this.oldPassword?.value === this.newPassword?.value) {
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
        const notMatching = this.newPassword?.value !== control.value;
        return notMatching ? { notMatching: true } : null;
      }
      return null;
    };
  }

  incorrectPasswordValidator(): ValidatorFn {
    return control => {
      if (this.#incorrectPassword) return { incorrect: true };
      return null;
    };
  }

  changeAgain() {
    this.completed = false;
    this.form.reset();
    this.form.enable();
    setTimeout(() => this.oldPasswordMatInput?.focus());
  }

  onSubmit() {
    if (!this.loading) {
      this.loading = true;
      this.generalError = false;
      this.form.disable();

      this.authPasswordChangeGQL
        .mutate({
          data: {
            oldPassword: this.oldPassword?.value,
            newPassword: this.newPassword?.value,
          },
        })
        .pipe(catchError(parseGqlErrors))
        .subscribe({
          next: () => {
            this.loading = false;
            this.completed = true;
            this.changed.emit();
          },
          error: (errors: GqlErrors) => {
            this.generalError = true;
            this.loading = false;
            this.form.enable();

            if (errors.find(e => e.code === 'WRONG_PASSWORD')) {
              this.generalError = false;
              this.#incorrectPassword = true;
              this.oldPassword?.updateValueAndValidity();
              this.oldPasswordInput?.nativeElement.select();
            }
          },
        });
    }
  }

  ngOnDestroy() {
    this.#subs.forEach(s => s?.unsubscribe);
  }
}
