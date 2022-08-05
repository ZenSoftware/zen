import { ExecutionContext, Injectable, Logger, mixin } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { Action, CaslAbilityFactory } from './casl-ability.factory';
import { SUBJECT_KEY } from './casl-subject.decorator';

export function GqlCaslGuard(...actions: Array<keyof typeof Action>) {
  @Injectable()
  class CaslGuard extends AuthGuard('jwt') {
    constructor(
      private readonly reflector: Reflector,
      private readonly caslAbilityFactory: CaslAbilityFactory
    ) {
      super();
    }

    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const ctx = GqlExecutionContext.create(context);
      const user = ctx.getContext().req.user;

      const classSubject = this.reflector.get<string>(SUBJECT_KEY, ctx.getClass());
      const handlerSubject = this.reflector.get<string>(SUBJECT_KEY, ctx.getHandler());
      const subject = handlerSubject ? handlerSubject : classSubject;

      const ability = this.caslAbilityFactory.createAbility(user);

      for (const action of actions) {
        const allowed = ability.can(action, subject as any);
        Logger.log(`user: ${user.id} - ${action} ${subject} ${allowed}`);
        if (!allowed) return false;
      }

      return true;
    }

    getRequest(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    }
  }

  return mixin(CaslGuard);
}
