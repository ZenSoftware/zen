import { User } from '@prisma/client';

export interface AuthSession {
  id: User['id'];
  token: string;
  roles: string[];
  rememberMe: boolean;
  expiresIn: number;
  rules: object[];
}
