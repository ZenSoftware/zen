import { AbstractControl } from '@angular/forms';
import { ApiConstants } from '@zen/api-interfaces';

interface UsernameErrors {
  minlength?: { actualLength: number; requiredLength: number };
  maxlength?: { actualLength: number; requiredLength: number };
}

export function usernameValidator(control: AbstractControl) {
  const errors: UsernameErrors = {};

  const trimmed = control.value?.trim() as string | null;

  if (trimmed && trimmed.length < ApiConstants.USERNAME_MIN_LENGTH) {
    errors.minlength = {
      actualLength: trimmed.length,
      requiredLength: ApiConstants.USERNAME_MIN_LENGTH,
    };
  }

  if (trimmed && trimmed.length > ApiConstants.USERNAME_MAX_LENGTH) {
    errors.maxlength = {
      actualLength: trimmed.length,
      requiredLength: ApiConstants.USERNAME_MAX_LENGTH,
    };
  }

  if (Object.keys(errors).length > 0) return errors;
  else return null;
}
