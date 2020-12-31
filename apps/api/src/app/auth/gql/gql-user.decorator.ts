import { ExecutionContext, UnauthorizedException, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { RequestUser } from '../request-user';

export const GqlUser = createParamDecorator((data, context: ExecutionContext) => {
  const user = GqlExecutionContext.create(context).getContext().req.user;
  if (!user) throw new UnauthorizedException('No user found for request');
  return user as RequestUser;
});
