import { ApiConstants } from '@zen/common';
import { MaxLength } from 'class-validator';

const LONGEST = ApiConstants.USERNAME_MAX_LENGTH > 254 ? ApiConstants.USERNAME_MAX_LENGTH : 254;

export class AuthPasswordResetRequestInput {
  @MaxLength(LONGEST)
  readonly emailOrUsername: string;
}
