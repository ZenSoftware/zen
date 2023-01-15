import { ValidatorFn } from '@angular/forms';
import { ApiConstants } from '@zen/common';

interface UsernameErrors {
  includesSpace?: boolean;
  minlength?: { actualLength: number; requiredLength: number };
  maxlength?: { actualLength: number; requiredLength: number };
}

export function usernameValidator(): ValidatorFn {
  return control => {
    const errors: UsernameErrors = {};

    if (control.value) {
      if (/\s/.test(control.value)) {
        errors.includesSpace = true;
      }

      if (control.value.length < ApiConstants.USERNAME_MIN_LENGTH) {
        errors.minlength = {
          actualLength: control.value.length,
          requiredLength: ApiConstants.USERNAME_MIN_LENGTH,
        };
      }

      if (control.value.length > ApiConstants.USERNAME_MAX_LENGTH) {
        errors.maxlength = {
          actualLength: control.value.length,
          requiredLength: ApiConstants.USERNAME_MAX_LENGTH,
        };
      }
    }

    if (Object.keys(errors).length > 0) return errors;
    else return null;
  };
}
