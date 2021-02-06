export const ApiConstants = {
  USERNAME_MIN_LENGTH: 2,
  USERNAME_MAX_LENGTH: 254,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 100,
};

export namespace ApiError {
  export interface AuthLogin {
    code: 'USER_NOT_FOUND' | 'INCORRECT_PASSWORD';
  }
  export interface AuthExchangeToken {
    code: 'USER_NOT_FOUND';
  }
  export interface AuthPasswordResetRequest {
    code: 'USER_NOT_FOUND';
  }
  export interface AuthPasswordResetConfirmation {
    code: 'USER_NOT_FOUND' | 'UNAUTHORIZED';
  }
  export interface AuthRegister {
    code: 'NO_PUBLIC_REGISTRATIONS' | 'USERNAME_TAKEN' | 'EMAIL_TAKEN';
  }
  export interface AuthPasswordChange {
    code: 'USER_NOT_FOUND' | 'WRONG_PASSWORD';
  }
}
