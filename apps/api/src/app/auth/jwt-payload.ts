export interface JwtPayload {
  readonly id: number;
  readonly roles: string;
  readonly iat: number; // issued at
  readonly exp: number; // expires
}
