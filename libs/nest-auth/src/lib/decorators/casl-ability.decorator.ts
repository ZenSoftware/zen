import {
  ContextType,
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Parameter decorator to provide the `CaslAbility` for the current user.
 * Works with Nest controllers and GraphQL resolvers.
 * ```ts
 * ＠UseGuards(CaslGuard)
 * sample(＠CaslAbility() ability: AppAbility) { ... }
 * ```
 */
export const CaslAbility = createParamDecorator((data: unknown, context: ExecutionContext) => {
  let ability;
  const type = context.getType() as ContextType | 'graphql';

  if (type === 'http') {
    ability = context.switchToHttp().getRequest().ability;
  } else if (type === 'graphql') {
    ability = GqlExecutionContext.create(context).getContext().req.ability;
  } else {
    throw new UnauthorizedException(`Context ${type} not supported`);
  }

  if (!ability) throw new UnauthorizedException('No ability found for request');

  return ability;
});
