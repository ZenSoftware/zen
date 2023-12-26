import { ContextType, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { CaslFactory } from '../casl-factory';
import { ALLOW_ANONYMOUS_KEY } from '../decorators/allow-anonymous.decorator';
import { CASL_POLICY_KEY, CaslPolicyHandler } from '../decorators/casl-policy.decorator';

/**
 * Guard that is used in conjunction with `CaslAbility`, `CaslAccessible` and `CaslPolicy` decorators.
 * Works with Nest controllers and GraphQL resolvers.
 * @example
 * ```ts
 * ＠UseGuards(CaslGuard)
 * async getBlogs(
 *   ＠CaslAbility() ability: AppAbility,
 *   ＠CaslAccessible('Blog') accessibleBlogs: Prisma.BlogWhereInput
 * ) { ... }
 * ```
 * @example
 * ```ts
 * ＠UseGuards(CaslGuard)
 * ＠CaslPolicy((ability: AppAbility) => ability.can('read', 'Blog'))
 * async getBlogs() { ... }
 * ```
 */
@Injectable()
export class CaslGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslFactory: CaslFactory
  ) {
    super();
  }

  override async canActivate(context: ExecutionContext) {
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

    let req: any;
    const type = context.getType() as ContextType | 'graphql';

    if (type === 'http') {
      req = context.switchToHttp().getRequest();
    } else if (type === 'graphql') {
      req = GqlExecutionContext.create(context).getContext().req;
    } else {
      throw new UnauthorizedException(`Context ${type} not supported`);
    }

    if (!req.user) await super.canActivate(context);

    if (!req.ability) req.ability = await this.caslFactory.createAbility(req.user);

    const classPolicies =
      this.reflector.get<CaslPolicyHandler[]>(CASL_POLICY_KEY, context.getClass()) || [];
    const handlerPolicies =
      this.reflector.get<CaslPolicyHandler[]>(CASL_POLICY_KEY, context.getHandler()) || [];
    const policies = classPolicies.concat(handlerPolicies);

    return policies.every(handler => handler(req.ability));
  }

  override getRequest(context: ExecutionContext) {
    const type = context.getType() as ContextType | 'graphql';
    if (type === 'http') {
      return context.switchToHttp().getRequest();
    } else if (type === 'graphql') {
      return GqlExecutionContext.create(context).getContext().req;
    } else {
      throw new UnauthorizedException(`Context ${type} not supported`);
    }
  }
}
