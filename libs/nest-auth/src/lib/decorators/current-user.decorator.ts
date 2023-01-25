import {
  ContextType,
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { RequestUser } from '../models/request-user';

/**
 * Decorator to provide the `RequestUser`
 */
export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  let user: RequestUser;
  const type = context.getType() as ContextType & 'graphql';

  if (type === 'http') {
    user = context.switchToHttp().getRequest().user;
  } else if (type === 'graphql') {
    user = GqlExecutionContext.create(context).getContext().req.user;
  }

  if (!user) throw new UnauthorizedException('No user found for request');

  return user;
});
