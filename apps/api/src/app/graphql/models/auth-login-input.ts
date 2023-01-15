import { ApiConstants } from '@zen/common';
import { IsBoolean, Length } from 'class-validator';

export class AuthLoginInput {
  @Length(ApiConstants.USERNAME_MIN_LENGTH, ApiConstants.USERNAME_MAX_LENGTH)
  readonly username: string;

  @Length(1, ApiConstants.PASSWORD_MAX_LENGTH)
  readonly password: string;

  @IsBoolean()
  readonly rememberMe: boolean;
}
