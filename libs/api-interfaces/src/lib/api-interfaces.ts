export const ApiConstants = {
  USERNAME_MIN_LENGTH: 2,
  USERNAME_MAX_LENGTH: 254,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 100,
};

export namespace ApiError {
  export enum Nest {
    THROTTLE = 'ThrottlerException: Too Many Requests',
  }
  export enum AuthLogin {
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',
  }
  export enum AuthExchangeToken {
    USER_NOT_FOUND = 'USER_NOT_FOUND',
  }
  export enum AuthPasswordResetRequest {
    USER_NOT_FOUND = 'USER_NOT_FOUND',
  }
  export enum AuthPasswordResetConfirmation {
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    UNAUTHORIZED = 'UNAUTHORIZED',
  }
  export enum AuthRegister {
    NO_PUBLIC_REGISTRATIONS = 'NO_PUBLIC_REGISTRATIONS',
    USERNAME_TAKEN = 'USERNAME_TAKEN',
    EMAIL_TAKEN = 'EMAIL_TAKEN',
  }
  export enum AuthPasswordChange {
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    WRONG_PASSWORD = 'WRONG_PASSWORD',
  }
}
