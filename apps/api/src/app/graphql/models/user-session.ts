export interface UserSession {
  id: string;
  maxAge: string;
  roles: string[];
  rememberMe: boolean;
}
