import {
  ContextType,
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Injectable decorator to retrieve the `CaslAbility`
 */
export const CaslAbility = createParamDecorator((data: unknown, context: ExecutionContext) => {
  let ability;
  const type = context.getType() as ContextType & 'graphql';

  if (type === 'http') {
    ability = context.switchToHttp().getRequest().ability;
  } else if (type === 'graphql') {
    ability = GqlExecutionContext.create(context).getContext().req.ability;
  }

  if (!ability) throw new UnauthorizedException('No ability found for request');

  return ability;
});
