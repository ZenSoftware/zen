import { ExecutionContext, Injectable } from '@nestjs/common';
import { ContextType } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { ALLOW_ANONYMOUS_KEY } from '../decorators/allow-anonymous.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RequestUser } from '../models/request-user';
import { rbacLogic } from './rbac-logic';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const allowAnonymousHandler = this.reflector.get<boolean | undefined>(
      ALLOW_ANONYMOUS_KEY,
      context.getHandler()
    );

    if (allowAnonymousHandler) return true;

    const allowAnonymousClass = this.reflector.get<boolean | undefined>(
      ALLOW_ANONYMOUS_KEY,
      context.getClass()
    );

    if (allowAnonymousClass) return true;

    await super.canActivate(context);

    let user: RequestUser;
    const type = context.getType() as ContextType & 'graphql';

    if (type === 'http') {
      user = context.switchToHttp().getRequest().user;
    } else if (type === 'graphql') {
      user = GqlExecutionContext.create(context).getContext().req.user;
    }

    const classRoles = this.reflector.get<string[] | undefined>(ROLES_KEY, context.getClass());
    const handlerRoles = this.reflector.get<string[] | undefined>(ROLES_KEY, context.getHandler());

    return rbacLogic(user.roles, classRoles, handlerRoles);
  }

  getRequest(context: ExecutionContext) {
    const type = context.getType() as ContextType & 'graphql';
    if (type === 'http') {
      return context.switchToHttp().getRequest();
    } else if (type === 'graphql') {
      return GqlExecutionContext.create(context).getContext().req;
    }
  }
}
