export interface AuthSession {
  id: number;
  token: string;
  roles: string[];
  rememberMe: boolean;
  maxAge: string;
}
