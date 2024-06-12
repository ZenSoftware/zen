export enum Codes {
  USER_NOT_FOUND = 'User not found',
  THROTTLE = 'ThrottlerException: Too Many Requests',
}

export enum AuthLogin {
  INCORRECT_PASSWORD = 'Incorrect Password',
}

export enum AuthPasswordResetConfirmation {
  JWT_FAILED = 'JWT failed verification',
}

export enum AuthRegister {
  USERNAME_TAKEN = 'Username taken',
  EMAIL_TAKEN = 'Email taken',
}

export enum AuthPasswordChange {
  WRONG_PASSWORD = 'Wrong password',
}

export enum JwtErrors {
  NO_HEADER = 'No Authorization header found',
  NO_BEARER = `No 'Bearer ' in Authorization header found`,
}
