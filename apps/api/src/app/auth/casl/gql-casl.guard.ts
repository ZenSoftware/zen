import { subject } from '@casl/ability';
import { ExecutionContext, Injectable, mixin } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Action } from '@zen/api-interfaces';

import { ALLOW_ANONYMOUS_KEY } from '../decorators/allow-anonymous.decorator';
import { CaslAbilityFactory } from './casl-ability.factory';
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
      const ctx = GqlExecutionContext.create(context);

      // @AllowAnonymous logic
      const allowAnonymousHandler = this.reflector.get<boolean | undefined>(
        ALLOW_ANONYMOUS_KEY,
        ctx.getHandler()
      );
      const allowAnonymousClass = this.reflector.get<boolean | undefined>(
        ALLOW_ANONYMOUS_KEY,
        ctx.getClass()
      );
      if (allowAnonymousHandler) return true;
      if (allowAnonymousClass) return true;

      await super.canActivate(context);
      const user = ctx.getContext().req.user;

      const classSubject = this.reflector.get<string>(SUBJECT_KEY, ctx.getClass());
      const handlerSubject = this.reflector.get<string>(SUBJECT_KEY, ctx.getHandler());
      const subjectName = handlerSubject ? handlerSubject : classSubject;

      const ability = await this.caslAbilityFactory.createAbility(user);

      const args = ctx.getArgs();

      for (const action of actions) {
        const inputSubject = args?.where ? subject(subjectName, args.where) : subjectName;
        const allowed = ability.can(action, inputSubject);
        // Logger.log(`GqlCaslGuard user: ${user.id} - ${action} ${subjectName} ${allowed}`);
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
