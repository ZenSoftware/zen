import { ForbiddenException } from '@nestjs/common';

/**
 * Imitates RBAC rules for [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/roles?view=aspnetcore-6.0).
 */
export function rbacLogic(
  userRoles: string[] | undefined | null,
  definedRoles: string[] | undefined | null
): boolean {
  userRoles = userRoles ?? [];
  definedRoles = definedRoles ?? [];

  if (
    definedRoles.length === 0 ||
    userRoles.includes('Super') ||
    definedRoles.some(definedRole => userRoles.includes(definedRole))
  ) {
    return true;
  } else {
    throw new ForbiddenException();
  }
}
