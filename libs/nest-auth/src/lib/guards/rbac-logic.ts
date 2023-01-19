import { ForbiddenException } from '@nestjs/common';

type RoleType = string[] | undefined;

/**
 * Imitates RBAC rules for [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/roles?view=aspnetcore-6.0).
 */
export function rbacLogic(
  userRoles: RoleType,
  classRoles: RoleType,
  handlerRoles: RoleType
): boolean {
  userRoles = userRoles ?? [];
  classRoles = classRoles ?? [];
  handlerRoles = handlerRoles ?? [];

  // Give super users unlimited access
  if (userRoles.includes('Super')) return true;

  if (classRoles.length > 0) {
    if (!userRoles.some(r => classRoles.includes(r))) {
      throw new ForbiddenException();
    }

    if (handlerRoles.length > 0 && !userRoles.some(r => handlerRoles.includes(r))) {
      throw new ForbiddenException();
    }
  } else if (handlerRoles.length > 0 && !userRoles.some(r => handlerRoles.includes(r))) {
    throw new ForbiddenException();
  }

  return true;
}
