import { NgIf } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
  ],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgIf,
    ReactiveFormsModule,
  ],
})
export class ZenUsernameInputComponent implements ControlValueAccessor, OnDestroy {
  @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;

  #usernameNotFound = false;
  @Input() set usernameNotFound(value: boolean) {
    this.#usernameNotFound = value;
    this.formControl.updateValueAndValidity();
  }

  #usernameTaken = false;
  @Input() set usernameTaken(value: boolean) {
    this.#usernameTaken = value;
    this.formControl.updateValueAndValidity();
  }

  @Input() set required(value: boolean | string | undefined) {
    const isRequired = value !== 'false' && value !== false;

    if (isRequired && !this.formControl.hasValidator(Validators.required)) {
      this.formControl.addValidators(Validators.required);
    } else if (!isRequired && this.formControl.hasValidator(Validators.required)) {
      this.formControl.removeValidators(Validators.required);
    }
  }

  #subs: Subscription[] = [];
  touchedListeners: Array<() => unknown> = [];
  formControl = new FormControl('', {
    validators: [
      usernameValidator(),
      this.usernameNotFoundValidator(),
      this.usernameTakenValidator(),
    ],
    nonNullable: true,
  });

  constructor() {
    const sub1 = this.formControl.valueChanges.subscribe(() => {
      this.#usernameNotFound = false;
    });
    this.#subs.push(sub1);

    const sub2 = this.formControl.valueChanges.subscribe(() => {
      this.#usernameTaken = false;
    });
    this.#subs.push(sub2);
  }

  select() {
    this.usernameInput.nativeElement.select();
  }

  usernameNotFoundValidator(): ValidatorFn {
    return () => (this.#usernameNotFound ? { notFound: true } : null);
  }

  usernameTakenValidator(): ValidatorFn {
    return () => (this.#usernameTaken ? { usernameTaken: true } : null);
  }

  writeValue(value: string) {
    this.formControl.setValue(value);
  }

  registerOnChange(fn: (_: any) => void) {
    const sub = this.formControl.valueChanges.subscribe(fn);
    this.#subs.push(sub);
    fn(this.formControl.value);
  }

  emitTouched() {
    this.touchedListeners.forEach(fn => fn());
  }

  registerOnTouched(fn: any) {
    this.touchedListeners.push(fn);
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) this.formControl.disable();
    else this.formControl.enable();
  }

  get invalid() {
    return this.formControl.invalid;
  }

  ngOnDestroy() {
    this.#subs.forEach(s => s.unsubscribe());
  }
}
