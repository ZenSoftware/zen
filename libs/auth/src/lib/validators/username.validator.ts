import { ApiConstants } from '@zen/api-interfaces';

interface UsernameErrors {
  minLength?: string;
  maxLength?: string;
}

export function usernameValidator(username: string) {
  const errors: UsernameErrors = {};

  if (username.length < ApiConstants.USERNAME_MIN_LENGTH) {
    errors.minLength = `Must be at least ${ApiConstants.USERNAME_MIN_LENGTH} characters long`;
  }

  if (username.length > ApiConstants.USERNAME_MAX_LENGTH) {
    errors.maxLength = `Must be less than ${ApiConstants.USERNAME_MAX_LENGTH} characters long`;
  }

  if (Object.keys(errors).length > 0) return errors;
  else return null;
}
