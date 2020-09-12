import { ApiConstants } from '@zen/api-interfaces';

interface PasswordErrors {
  minLength?: string;
  maxLength?: string;
}

export function validatePassword(password: string) {
  const errors: PasswordErrors = {};

  if (password.length < ApiConstants.PASSWORD_MIN_LENGTH) {
    errors.minLength = `Must be at least ${ApiConstants.PASSWORD_MIN_LENGTH} characters long`;
  }

  if (password.length > ApiConstants.PASSWORD_MAX_LENGTH) {
    errors.maxLength = `Must be less than ${ApiConstants.PASSWORD_MAX_LENGTH} characters long`;
  }

  if (Object.keys(errors).length > 0) return errors;
  else return null;
}
