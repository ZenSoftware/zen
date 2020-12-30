import { ApiConstants } from '@zen/api-interfaces';
import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

export class AuthRegisterInput {
  @IsEmail()
  @MaxLength(254)
  readonly email: string;

  @Length(ApiConstants.PASSWORD_MIN_LENGTH, 100)
  readonly password: string;

  readonly firstName?: string;

  readonly lastName?: string;
}
