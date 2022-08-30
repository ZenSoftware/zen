import { User } from '@prisma/client';

export interface JwtPayload {
  readonly jti: string;
  readonly aud: string;
  readonly sub: User['id'];
  readonly roles: string[];
  readonly iat?: number;
  readonly exp?: number;
}
