import { AbstractControl } from '@angular/forms';
import { ApiConstants } from '@zen/api-interfaces';

interface UsernameErrors {
  includesSpace?: boolean;
  minLength?: { actualLength: number; requiredLength: number };
  maxLength?: { actualLength: number; requiredLength: number };
}

export function usernameValidator(control: AbstractControl) {
  const errors: UsernameErrors = {};

  if (control.value && /\s/.test(control.value)) {
    errors.includesSpace = true;
  }

  if (control.value && control.value.length < ApiConstants.USERNAME_MIN_LENGTH) {
    errors.minLength = {
      actualLength: control.value.length,
      requiredLength: ApiConstants.USERNAME_MIN_LENGTH,
    };
  }

  if (control.value && control.value.length > ApiConstants.USERNAME_MAX_LENGTH) {
    errors.maxLength = {
      actualLength: control.value.length,
      requiredLength: ApiConstants.USERNAME_MAX_LENGTH,
    };
  }

  if (Object.keys(errors).length > 0) return errors;
  else return null;
}
