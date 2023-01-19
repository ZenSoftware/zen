import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
  ContextType,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { RequestUser } from '../models/request-user';

/**
 * Injectable decorator to retrieve the `RequestUser`
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
