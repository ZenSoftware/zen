import { ContextType, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { CaslFactory } from '../casl-factory';
import { ALLOW_ANONYMOUS_KEY } from '../decorators/allow-anonymous.decorator';

/**
 * Guard that is used in conjunction with `＠CaslAbility` & `＠CaslAccessible` parameter decorators.
 * Works with either HTTP or GraphQL requests.
 * ```ts
 * ＠UseGuards(CaslGuard)
 * async findUniqueUser(
 *   ＠CaslAbility() ability: AppAbility,
 *   ＠CaslAccessible('Post') accessiblePosts: Prisma.PostWhereInput
 * ) { ... }
 * ```
 */
@Injectable()
export class CaslGuard extends AuthGuard('jwt') {
  constructor(readonly caslFactory: CaslFactory, readonly reflector: Reflector) {
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

    let req;
    const type = context.getType() as ContextType & 'graphql';

    if (type === 'http') {
      req = context.switchToHttp().getRequest();
    } else if (type === 'graphql') {
      req = GqlExecutionContext.create(context).getContext().req;
    }

    if (!req.user) await super.canActivate(context);

    if (!req.ability) req.ability = await this.caslFactory.createAbility(req.user);

    return true;
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
