import { UnauthorizedException } from '@nestjs/common';
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
    if (!_userRoles.some(r => _classRoles.includes(r as Role))) throw new UnauthorizedException();
    if (_handlerRoles.length > 0 && !_userRoles.some(r => _handlerRoles.includes(r)))
      throw new UnauthorizedException();
  } else if (_handlerRoles.length > 0 && !_userRoles.some(r => _handlerRoles.includes(r))) {
    throw new UnauthorizedException();
  }

  return true;
}
