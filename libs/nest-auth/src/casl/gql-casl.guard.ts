import { subject } from '@casl/ability';
import { ExecutionContext, Inject, Injectable, mixin } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Action } from '@zen/api-interfaces';

import { ALLOW_ANONYMOUS_KEY } from '../decorators/allow-anonymous.decorator';
import { CASL_FACTORY_TOKEN } from './casl-factory.token';
import { SUBJECT_KEY } from './casl-subject.decorator';

export function GqlCaslGuard(...actions: Array<Action>) {
  @Injectable()
  class CaslGuard extends AuthGuard('jwt') {
    constructor(@Inject(CASL_FACTORY_TOKEN) readonly caslFactory, readonly reflector: Reflector) {
      super();
    }

    async canActivate(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);

      // @AllowAnonymous logic
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

      const classSubject = this.reflector.get<string>(SUBJECT_KEY, ctx.getClass());
      const handlerSubject = this.reflector.get<string>(SUBJECT_KEY, ctx.getHandler());
      const subjectName = handlerSubject ? handlerSubject : classSubject;

      const ability = await this.caslFactory.createAbility(user);

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
