import { AbstractControl } from '@angular/forms';
import { ApiConstants } from '@zen/api-interfaces';

interface PasswordErrors {
  minlength?: { actualLength: number; requiredLength: number };
  maxlength?: { actualLength: number; requiredLength: number };
}

export function passwordValidator(control: AbstractControl) {
  const errors: PasswordErrors = {};

  const trimmed = control.value?.trim() as string | null;

  if (trimmed && trimmed.length < ApiConstants.PASSWORD_MIN_LENGTH) {
    errors.minlength = {
      actualLength: trimmed.length,
      requiredLength: ApiConstants.PASSWORD_MIN_LENGTH,
    };
  }

  if (trimmed && trimmed.length > ApiConstants.PASSWORD_MAX_LENGTH) {
    errors.maxlength = {
      actualLength: trimmed.length,
      requiredLength: ApiConstants.PASSWORD_MAX_LENGTH,
    };
  }

  if (Object.keys(errors).length > 0) return errors;
  else return null;
}
