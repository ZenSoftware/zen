import { IsEmail, MaxLength } from 'class-validator';

export class AuthPasswordResetRequestInput {
  @IsEmail()
  @MaxLength(254)
  readonly email: string;
}
