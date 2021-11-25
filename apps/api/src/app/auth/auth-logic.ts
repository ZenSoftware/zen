import { Role } from '@prisma/client';

type RoleType = string[] | Role[] | undefined;

export function authLogic(
  userRoles: RoleType,
  classRoles: RoleType,
  handlerRoles: RoleType
): boolean {
  const _userRoles = userRoles ?? [];
  const _classRoles = classRoles ?? [];
  const _handlerRoles = handlerRoles ?? [];

  // Give super users unlimited access
  if (_userRoles.includes(Role.Super)) return true;

  if (_classRoles.length > 0) {
    if (!_userRoles.some(r => _classRoles.includes(r as Role))) return false;
    if (_handlerRoles.length > 0 && !_userRoles.some(r => _handlerRoles.includes(r))) return false;
  } else if (_handlerRoles.length > 0 && !_userRoles.some(r => _handlerRoles.includes(r))) {
    return false;
  }

  return true;
}
