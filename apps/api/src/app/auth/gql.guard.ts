import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';

import { authLogic } from './auth-logic';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
/**
 * Replicates RBAC rules for [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/roles?view=aspnetcore-6.0).
 * **Super** users are granted unlimited access.
 */
export class GqlGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);

    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    const classRoles = this.reflector.get<Role[]>(ROLES_KEY, ctx.getClass());
    const handlerRoles = this.reflector.get<Role[]>(ROLES_KEY, ctx.getHandler());

    return authLogic(user.roles, classRoles, handlerRoles);
  }
}
