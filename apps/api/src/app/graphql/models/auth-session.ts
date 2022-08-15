export interface AuthSession {
  id: number;
  token: string;
  roles: string[];
  rememberMe: boolean;
  expiresIn: number;
  rules: object[];
}
