export interface AuthSession {
  id: string;
  maxAge: string;
  roles: string[];
  rememberMe: boolean;
}
