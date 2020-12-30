export interface JwtPayload {
  readonly id: number;
  readonly roles: string;
  readonly iss?: string;
  readonly aud?: string;
  readonly sub?: string;
  readonly exp?: number;
  readonly iat?: number;
}
