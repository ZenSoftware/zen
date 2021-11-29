export interface JwtPayload {
  readonly id: number;
  readonly roles: string;
  readonly exp?: number; // expires
}
