import { RequestUser } from './request-user';

export interface JwtPayload {
  readonly jti: string;
  readonly aud: string;
  readonly sub: RequestUser['id'];
  readonly roles: RequestUser['roles'];
  readonly iat?: number;
  readonly exp?: number;
}
