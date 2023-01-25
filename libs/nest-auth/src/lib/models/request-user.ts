import { Role } from '@zen/common';

export class RequestUser {
  id: string; // Change to number if you are using integer ids
  roles: Role[];
}
