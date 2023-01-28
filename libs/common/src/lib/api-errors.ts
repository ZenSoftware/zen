export enum Nest {
  THROTTLE = 'ThrottlerException: Too Many Requests',
}

export enum AuthLogin {
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',
}

export enum AuthPasswordResetRequest {
  USER_NOT_FOUND = 'USER_NOT_FOUND',
}

export enum AuthRegister {
  USERNAME_TAKEN = 'USERNAME_TAKEN',
  EMAIL_TAKEN = 'EMAIL_TAKEN',
}

export enum AuthPasswordChange {
  WRONG_PASSWORD = 'WRONG_PASSWORD',
}
