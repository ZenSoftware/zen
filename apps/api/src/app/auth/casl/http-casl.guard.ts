import { ExecutionContext, Injectable, mixin } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { ALLOW_ANONYMOUS_KEY } from '../decorators/allow-anonymous.decorator';
import { Action, CaslAbilityFactory } from './casl-ability.factory';
import { SUBJECT_KEY } from './casl-subject.decorator';

export function HttpCaslGuard(...actions: Array<keyof typeof Action>) {
  @Injectable()
  class CaslGuard extends AuthGuard('jwt') {
    constructor(
      private readonly reflector: Reflector,
      private readonly caslAbilityFactory: CaslAbilityFactory
    ) {
      super();
    }

    async canActivate(context: ExecutionContext) {
      // @AllowAnonymous logic
      const allowAnonymousHandler = this.reflector.get<boolean | undefined>(
        ALLOW_ANONYMOUS_KEY,
        context.getHandler()
      );
      const allowAnonymousClass = this.reflector.get<boolean | undefined>(
        ALLOW_ANONYMOUS_KEY,
        context.getClass()
      );
      if (allowAnonymousHandler) return true;
      if (allowAnonymousClass) return true;

      await super.canActivate(context);
      const { user } = context.switchToHttp().getRequest();

      const classSubject = this.reflector.get<string>(SUBJECT_KEY, context.getClass());
      const handlerSubject = this.reflector.get<string>(SUBJECT_KEY, context.getHandler());
      const subjectName = handlerSubject ? handlerSubject : classSubject;

      const ability = this.caslAbilityFactory.createAbility(user);

      for (const action of actions) {
        const allowed = ability.can(action, subjectName as any);
        if (!allowed) return false;
      }

      return true;
    }
  }

  return mixin(CaslGuard);
}
