import { ApiConstants } from '@zen/api-interfaces';
import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

export class AuthRegisterInput {
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  @MaxLength(254)
  readonly email: string;

  @Length(ApiConstants.PASSWORD_MIN_LENGTH, 100)
  readonly password: string;
}
