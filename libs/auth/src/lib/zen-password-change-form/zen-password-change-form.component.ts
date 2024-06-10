import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
  inject,
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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { ApolloError } from '@apollo/client/errors';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ZenLoadingComponent } from '@zen/components';
import { verticalAccordion } from '@zen/components/animations';
import { ApiError, AuthPasswordChangeGQL, AuthPasswordChangeInput } from '@zen/graphql';
import { Subscription } from 'rxjs';

import { ZenPasswordInputComponent } from '../inputs';
import { passwordValidatorFn } from '../validators';

interface FormType {
  oldPassword: FormControl<AuthPasswordChangeInput['oldPassword']>;
  newPassword: FormControl<AuthPasswordChangeInput['newPassword']>;
  passwordConfirm: FormControl<AuthPasswordChangeInput['newPassword']>;
}

@Component({
  selector: 'zen-password-change-form',
  templateUrl: 'zen-password-change-form.component.html',
  animations: [...verticalAccordion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
    TranslateModule,
    ZenLoadingComponent,
    ZenPasswordInputComponent,
  ],
})
export class ZenPasswordChangeFormComponent implements OnDestroy {
  @ViewChild('oldPasswordInput') oldPasswordInput!: ZenPasswordInputComponent;
  @Output() changed = new EventEmitter();

  #subs: Subscription[] = [];
  #incorrectPassword = false;
  translate = inject(TranslateService);
  loading = false;
  completed = false;
  generalError = false;
  hidePassword = true;
  form = new FormGroup<FormType>({
    oldPassword: new FormControl(),
    newPassword: new FormControl('', {
      validators: [Validators.required, this.passwordValidator()],
      nonNullable: true,
    }),
    passwordConfirm: new FormControl('', {
      validators: [Validators.required, this.passwordConfirmValidator()],
      nonNullable: true,
    }),
  });

  constructor(
    private authPasswordChangeGQL: AuthPasswordChangeGQL,
    public router: Router
  ) {
    const sub = this.oldPassword.valueChanges.subscribe(() => {
      this.#incorrectPassword = false;
      this.newPassword.updateValueAndValidity();
    });
    this.#subs.push(sub);
  }

  get oldPassword() {
    return this.form.get('oldPassword') as FormType['oldPassword'];
  }

  get newPassword() {
    return this.form.get('newPassword') as FormType['newPassword'];
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm') as FormType['passwordConfirm'];
  }

  passwordValidator(): ValidatorFn {
    return control => {
      if (this.form) {
        this.passwordConfirm.updateValueAndValidity();

        let errors: (ReturnType<typeof passwordValidatorFn> & { oldEqualsNew?: boolean }) | null =
          passwordValidatorFn(control);

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
    setTimeout(() => this.oldPasswordInput.select());
  }

  onSubmit() {
    if (!this.loading) {
      this.loading = true;
      this.generalError = false;

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
        .subscribe({
          next: () => {
            this.loading = false;
            this.completed = true;
            this.changed.emit();
          },
          error: (error: ApolloError) => {
            this.generalError = true;
            this.loading = false;
            this.form.enable();

            if (error.message === ApiError.AuthPasswordChange.WRONG_PASSWORD) {
              this.generalError = false;
              this.#incorrectPassword = true;
              this.translate.get('INCORRECT_PASSWORD').subscribe(translation => {
                this.oldPasswordInput.customErrorMessage = translation;
              });
              this.oldPasswordInput.select();
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
