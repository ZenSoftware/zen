import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NgFor } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Role } from '@zen/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zen-user-roles-input',
  templateUrl: 'zen-user-roles-input.component.html',
  standalone: true,
  imports: [MatChipsModule, MatFormFieldModule, MatIconModule, NgFor, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ZenUserRolesInputComponent,
      multi: true,
    },
  ],
})
export class ZenUserRolesInputComponent implements ControlValueAccessor, OnDestroy {
  readonly ROLES = Object.values(Role);
  control = new FormControl<string[]>([], { nonNullable: true });
  #subs: Subscription[] = [];
  touchedListeners: Array<() => unknown> = [];

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.control.setValue([...this.control.value, value]);
    }

    event.chipInput!.clear();
  }

  remove(role: string): void {
    this.control.setValue(this.control.value.filter(r => r !== role));
  }

  writeValue(value: string[]) {
    if (value) {
      this.control.setValue(value);
    } else {
      this.control.reset();
    }
  }

  registerOnChange(fn: (_: any) => void) {
    const sub = this.control.valueChanges.subscribe(fn);
    this.#subs.push(sub);
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

  ngOnDestroy() {
    this.#subs.forEach(s => s.unsubscribe());
  }
}
