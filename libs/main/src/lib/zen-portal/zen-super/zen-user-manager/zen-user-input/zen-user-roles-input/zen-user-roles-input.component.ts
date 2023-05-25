import { NgFor } from '@angular/common';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Role } from '@zen/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zen-user-roles-input',
  templateUrl: 'zen-user-roles-input.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatCheckboxModule, NgFor],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ZenUserRolesInputComponent,
      multi: true,
    },
  ],
})
export class ZenUserRolesInputComponent implements ControlValueAccessor, OnDestroy {
  @ViewChild('checkboxes') checkboxes!: ElementRef<HTMLDivElement>;
  readonly ROLES = Object.values(Role);
  form;
  #subs: Subscription[] = [];
  touchedListeners: Array<() => unknown> = [];

  constructor() {
    const formControls: Record<string, FormControl> = {};
    for (const role of this.ROLES) {
      formControls[role] = new FormControl(false, { nonNullable: true });
    }
    this.form = new FormGroup(formControls);
  }

  get formControlKeys() {
    return Object.keys(this.form.controls);
  }

  writeValue(value: string[]) {
    if (value) {
      for (const role of this.ROLES) {
        this.form.get(role)!.setValue(value.includes(role));
      }

      const uniqueRoles = value.filter(v => !this.ROLES.includes(v as any));
      for (const role of uniqueRoles) {
        if (this.form.get(role)) {
          this.form.get(role)!.setValue(true);
        } else {
          this.form.addControl(role, new FormControl(true, { nonNullable: true }));
        }
      }
    } else {
      this.form.reset();
    }
  }

  getCheckedRoles() {
    const values: string[] = [];
    for (const role of this.ROLES) {
      if (this.form.get(role)?.value) values.push(role);
    }
    return values;
  }

  registerOnChange(fn: (_: any) => void) {
    const sub = this.form.valueChanges.subscribe(fn);
    this.form.valueChanges.subscribe(() => {
      fn(this.getCheckedRoles());
    });
    this.#subs.push(sub);

    fn(this.getCheckedRoles());
  }

  emitTouched() {
    this.touchedListeners.forEach(fn => fn());
  }

  registerOnTouched(fn: any) {
    this.touchedListeners.push(fn);
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) this.form.disable();
    else this.form.enable();
  }

  ngOnDestroy() {
    this.#subs.forEach(s => s.unsubscribe());
  }
}
