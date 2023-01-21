import { ApiConstants } from '@zen/common';
import { IsEmail, Length } from 'class-validator';

export class AuthRegisterInput {
  @Length(ApiConstants.USERNAME_MIN_LENGTH, ApiConstants.USERNAME_MAX_LENGTH)
  readonly username: string;

  @IsEmail()
  @Length(3, 254)
  readonly email: string;

  @Length(ApiConstants.PASSWORD_MIN_LENGTH, ApiConstants.PASSWORD_MAX_LENGTH)
  readonly password: string;
}
