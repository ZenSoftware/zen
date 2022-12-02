export interface JwtPayload {
  readonly jti: string;
  readonly aud: string;
  readonly sub: any;
  readonly roles: string[];
  readonly iat?: number;
  readonly exp?: number;
}
