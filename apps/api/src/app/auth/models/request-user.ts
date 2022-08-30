import { User } from '@prisma/client';

export class RequestUser {
  id: User['id'];
  roles: string[];
}
