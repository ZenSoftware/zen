import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, OnDestroy, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Role } from '@zen/common';
import { ZenSnackbarError, ZenSnackbarModule } from '@zen/components';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zen-roles-input',
  templateUrl: 'zen-roles-input.component.html',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslateModule,
    ZenSnackbarModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ZenRolesInputComponent,
      multi: true,
    },
  ],
})
export class ZenRolesInputComponent implements ControlValueAccessor, OnDestroy {
  readonly ROLES = Object.values(Role);
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly control = new FormControl<string[]>([], { nonNullable: true });
  readonly #subs: Subscription[] = [];
  private zenSnackbarError = inject(ZenSnackbarError);
  translate = inject(TranslateService);
  touchedListeners: Array<() => unknown> = [];

  @Input() labelTranslationKey = 'ROLES';

  get filteredRoles() {
    return this.ROLES.filter(r => !this.control.value.includes(r));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (this.control.value.includes(value)) {
      this.zenSnackbarError.open(null, {
        message: `Already has role ${value}`,
        log: false,
        copyable: true,
      });
    } else if (value) {
      this.control.setValue([...this.control.value, value]);
    }

    event.chipInput.clear();
  }

  remove(role: string): void {
    this.control.setValue(this.control.value.filter(r => r !== role));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.control.setValue([...this.control.value, event.option.viewValue]);
  }

  writeValue(value: string[]) {
    if (value) this.control.setValue(value);
    else this.control.reset();
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
