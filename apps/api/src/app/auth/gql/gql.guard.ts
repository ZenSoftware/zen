import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';

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
    const userRoles: Role[] = user.roles ?? [];

    // Give super users unlimited access
    if (userRoles.includes(Role.Super)) return true;

    let classRoles = this.reflector.get<Role[]>('roles', ctx.getClass());
    classRoles = classRoles ?? [];

    let handlerRoles = this.reflector.get<Role[]>('roles', ctx.getHandler());
    handlerRoles = handlerRoles ?? [];

    if (classRoles.length > 0) {
      if (!userRoles.some(r => classRoles.includes(r))) return false;
      if (handlerRoles.length > 0 && !userRoles.some(r => handlerRoles.includes(r))) return false;
    } else if (handlerRoles.length > 0 && !userRoles.some(r => handlerRoles.includes(r))) {
      return false;
    }

    return true;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
