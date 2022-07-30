export interface JwtPayload {
  readonly aud: string;
  readonly sub: number;
  readonly roles: string[];
  readonly exp?: number;
}
