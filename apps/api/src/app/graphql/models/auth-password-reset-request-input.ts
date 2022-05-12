import { MaxLength } from 'class-validator';

export class AuthPasswordResetRequestInput {
  @MaxLength(254)
  readonly emailOrUsername: string;
}
