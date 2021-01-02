import { AbstractControl } from '@angular/forms';
import { ApiConstants } from '@zen/api-interfaces';

interface UsernameErrors {
  minlength?: { actualLength: number; requiredLength: number };
  maxlength?: { actualLength: number; requiredLength: number };
}

export function usernameValidator(control: AbstractControl) {
  const errors: UsernameErrors = {};

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

  if (Object.keys(errors).length > 0) return errors;
  else return null;
}
