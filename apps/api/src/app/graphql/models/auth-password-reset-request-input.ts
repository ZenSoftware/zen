import { ApiConstants } from '@zen/api-interfaces';
import { Length } from 'class-validator';

export class AuthPasswordResetRequestInput {
  @Length(ApiConstants.USERNAME_MIN_LENGTH, 254)
  readonly emailOrUsername: string;
}
