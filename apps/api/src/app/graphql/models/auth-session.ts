export interface AuthSession {
  id: number;
  maxAge: string;
  roles: string[];
  rememberMe: boolean;
}
