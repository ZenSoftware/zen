import { User } from '../../prisma';

export interface AuthSession {
  id: User['id'];
  token: string;
  roles: string[];
  rememberMe: boolean;
  expiresIn: number;
  rules: object[];
}
