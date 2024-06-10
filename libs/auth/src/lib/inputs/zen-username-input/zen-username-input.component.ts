import { Component, ElementRef, Input, OnDestroy, ViewChild, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { usernameValidator } from '../../validators';

@Component({
  selector: 'zen-username-input',
  templateUrl: 'zen-username-input.component.html',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ZenUsernameInputComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ZenUsernameInputComponent,
      multi: true,
    },
  ],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class ZenUsernameInputComponent implements ControlValueAccessor, OnDestroy {
  @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;

  private showCustomError = false;
  translate = inject(TranslateService);

  #customErrorMessage = '';
  @Input() set customErrorMessage(value: string) {
    this.showCustomError = !!value;
    this.#customErrorMessage = value;
    this.control.updateValueAndValidity();
  }

  get customErrorMessage() {
    return this.#customErrorMessage;
  }

  @Input() labelTranslationKey = 'USERNAME';

  @Input() set required(value: boolean | string | undefined) {
    const isRequired = value !== 'false' && value !== false;

    if (isRequired && !this.control.hasValidator(Validators.required)) {
      this.control.addValidators(Validators.required);
    } else if (!isRequired && this.control.hasValidator(Validators.required)) {
      this.control.removeValidators(Validators.required);
    }
  }

  #subs: Subscription[] = [];
  touchedListeners: Array<() => unknown> = [];
  control = new FormControl('', {
    validators: [usernameValidator(), this.customErrorValidator()],
    nonNullable: true,
  });

  constructor() {
    const sub = this.control.valueChanges.subscribe(() => {
      this.showCustomError = false;
    });
    this.#subs.push(sub);
  }

  select() {
    this.usernameInput.nativeElement.select();
  }

  customErrorValidator(): ValidatorFn {
    return () => (this.showCustomError ? { custom: true } : null);
  }

  writeValue(value: string) {
    this.control.setValue(value);
  }

  registerOnChange(fn: (_: any) => void) {
    const sub = this.control.valueChanges.subscribe(fn);
    this.#subs.push(sub);
    fn(this.control.value);
  }

  emitTouched() {
    this.touchedListeners.forEach(fn => fn());
  }

  registerOnTouched(fn: any) {
    this.touchedListeners.push(fn);
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) this.control.disable();
    else this.control.enable();
  }

  validate() {
    return (
      this.control.invalid && {
        invalid: true,
      }
    );
  }

  ngOnDestroy() {
    this.#subs.forEach(s => s.unsubscribe());
  }
}
