import {
  ContextType,
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { RequestUser } from '../models/request-user';

/**
 * Parameter decorator to provide the `RequestUser`.
 * Utilized in conjunction with either `RolesGuard` or `CaslGuard`.
 * Works with either HTTP or GraphQL requests.
 * ```ts
 * ＠UseGuards(RolesGuard('Registered'))
 * accountInfo(＠CurrentUser() user: RequestUser) { ... }
 * ```
 */
export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  let user: RequestUser;
  const type = context.getType() as ContextType | 'graphql';

  if (type === 'http') {
    user = context.switchToHttp().getRequest().user;
  } else if (type === 'graphql') {
    user = GqlExecutionContext.create(context).getContext().req.user;
  } else {
    throw new UnauthorizedException(`Context ${type} not supported`);
  }

  if (!user) throw new UnauthorizedException('No user found for request');

  return user;
});
