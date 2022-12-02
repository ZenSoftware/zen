import { ExecutionContext, Inject, Injectable, mixin } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Action } from '@zen/api-interfaces';

import { ALLOW_ANONYMOUS_KEY } from '../decorators/allow-anonymous.decorator';
import { CASL_FACTORY_TOKEN } from './casl-factory.token';
import { SUBJECT_KEY } from './casl-subject.decorator';

export function HttpCaslGuard(...actions: Array<Action>) {
  @Injectable()
  class CaslGuard extends AuthGuard('jwt') {
    constructor(
      @Inject(CASL_FACTORY_TOKEN) readonly caslAbilityFactory,
      readonly reflector: Reflector
    ) {
      super();
    }

    async canActivate(context: ExecutionContext) {
      // @AllowAnonymous logic
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
      const { user } = context.switchToHttp().getRequest();

      const classSubject = this.reflector.get<string>(SUBJECT_KEY, context.getClass());
      const handlerSubject = this.reflector.get<string>(SUBJECT_KEY, context.getHandler());
      const subjectName = handlerSubject ? handlerSubject : classSubject;

      const ability = await this.caslAbilityFactory.createAbility(user);

      for (const action of actions) {
        const allowed = ability.can(action, subjectName as any);
        if (!allowed) return false;
      }

      return true;
    }
  }

  return mixin(CaslGuard);
}
