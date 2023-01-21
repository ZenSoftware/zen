import { ContextType, ExecutionContext, Injectable, mixin } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Action } from '@zen/common';

import { CaslFactory } from '../casl-factory';
import { ALLOW_ANONYMOUS_KEY } from '../decorators/allow-anonymous.decorator';
import { CASL_SUBJECT_KEY } from '../decorators/casl-subject.decorator';
import { RequestUser } from '../models/request-user';

export function CaslGuard(...actions: Array<Action>) {
  @Injectable()
  class MixinCaslGuard extends AuthGuard('jwt') {
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

      await super.canActivate(context);

      if (actions.length === 0) return true;

      const classSubject = this.reflector.get<string>(CASL_SUBJECT_KEY, context.getClass());
      const handlerSubject = this.reflector.get<string>(CASL_SUBJECT_KEY, context.getHandler());
      const subjectName = handlerSubject ? handlerSubject : classSubject;

      let user: RequestUser;
      const type = context.getType() as ContextType & 'graphql';

      if (type === 'http') {
        user = context.switchToHttp().getRequest().user;
      } else if (type === 'graphql') {
        user = GqlExecutionContext.create(context).getContext().req.user;
      }

      const ability = await this.caslFactory.createAbility(user);

      for (const action of actions) {
        const allowed = ability.can(action, subjectName);
        // console.log(`CaslGuard user: ${user.id} - ${action} ${subjectName} ${allowed}`);
        if (allowed) return true;
      }

      return false;
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

  return mixin(MixinCaslGuard);
}
