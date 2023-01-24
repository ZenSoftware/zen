export class RequestUser<Role = string> {
  id: string; // Change to number if you are using integer ids
  roles: Array<Role>;
}
