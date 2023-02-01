export class RequestUser<Role = string> {
  id: string; // Change type to number if using integer ids
  roles: Role[];
}
