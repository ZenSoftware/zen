import { IsEmail, MaxLength } from 'class-validator';

export class AuthResendVerificationInput {
  @IsEmail()
  @MaxLength(254)
  readonly email: string;
}
