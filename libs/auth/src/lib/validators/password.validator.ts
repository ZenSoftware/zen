import { AbstractControl } from '@angular/forms';
import { ApiConstants } from '@zen/api-interfaces';

interface PasswordErrors {
  minLength?: { actualLength: number; requiredLength: number };
  maxLength?: { actualLength: number; requiredLength: number };
}

export function passwordValidator(control: AbstractControl) {
  const errors: PasswordErrors = {};

  if (control.value && control.value.length < ApiConstants.PASSWORD_MIN_LENGTH) {
    errors.minLength = {
      actualLength: control.value.length,
      requiredLength: ApiConstants.PASSWORD_MIN_LENGTH,
    };
  }

  if (control.value && control.value.length > ApiConstants.PASSWORD_MAX_LENGTH) {
    errors.maxLength = {
      actualLength: control.value.length,
      requiredLength: ApiConstants.PASSWORD_MAX_LENGTH,
    };
  }

  if (Object.keys(errors).length > 0) return errors;
  else return null;
}
