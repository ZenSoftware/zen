import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { ALLOW_ANONYMOUS_KEY } from '../decorators/allow-anonymous.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { rbacLogic } from './rbac-logic';

@Injectable()
/**
 * Imitates RBAC rules for [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/roles?view=aspnetcore-6.0).
 * **Super** users are granted unrestricted access.
 */
export class GqlGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    const allowAnonymousHandler = this.reflector.get<boolean | undefined>(
      ALLOW_ANONYMOUS_KEY,
      ctx.getHandler()
    );

    if (allowAnonymousHandler) return true;

    const allowAnonymousClass = this.reflector.get<boolean | undefined>(
      ALLOW_ANONYMOUS_KEY,
      ctx.getClass()
    );

    if (allowAnonymousClass) return true;

    await super.canActivate(context);

    const user = ctx.getContext().req.user;
    const classRoles = this.reflector.get<string[]>(ROLES_KEY, ctx.getClass());
    const handlerRoles = this.reflector.get<string[]>(ROLES_KEY, ctx.getHandler());

    return rbacLogic(user.roles, classRoles, handlerRoles);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
