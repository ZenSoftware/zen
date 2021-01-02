import { ApiConstants } from '@zen/api-interfaces';
import { IsBoolean, IsNotEmpty, Length } from 'class-validator';

export class AuthLoginInput {
  @IsNotEmpty()
  readonly username: string;

  @Length(1, ApiConstants.PASSWORD_MAX_LENGTH)
  readonly password: string;

  @IsBoolean()
  readonly rememberMe: boolean;
}
