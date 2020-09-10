import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { Role } from '../../auth';

@Injectable()
export class GqlGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);

    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    const classRoles = this.reflector.get<Role[]>('roles', ctx.getClass());
    const handlerRoles = this.reflector.get<Role[]>('roles', ctx.getHandler());

    let allowedRoles: Role[] = [];
    if (classRoles) allowedRoles = classRoles;
    if (handlerRoles) allowedRoles = allowedRoles.concat(handlerRoles);

    if (allowedRoles.length === 0) return true;

    return user.roles && user.roles.some((userRole: Role) => allowedRoles.includes(userRole));
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
