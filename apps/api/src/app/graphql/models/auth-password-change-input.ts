import { ApiConstants } from '@zen/api-interfaces';
import { Length } from 'class-validator';

export class AuthPasswordChangeInput {
  @Length(1, ApiConstants.PASSWORD_MAX_LENGTH)
  readonly oldPassword: string;

  @Length(ApiConstants.PASSWORD_MIN_LENGTH, ApiConstants.PASSWORD_MAX_LENGTH)
  readonly newPassword: string;
}
