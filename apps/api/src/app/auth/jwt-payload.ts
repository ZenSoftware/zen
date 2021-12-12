export interface JwtPayload {
  readonly sub: number;
  readonly roles: string[];
  readonly exp?: number; // expires
}
