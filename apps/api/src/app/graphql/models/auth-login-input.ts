import { ApiConstants } from '@zen/api-interfaces';
import { IsBoolean, IsEmail, Length, MaxLength } from 'class-validator';

export class AuthLoginInput {
  @IsEmail()
  @MaxLength(254)
  readonly email: string;

  @Length(1, ApiConstants.PASSWORD_MAX_LENGTH)
  readonly password: string;

  @IsBoolean()
  readonly rememberMe: boolean;
}
