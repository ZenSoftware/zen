import { ExecutionContext, UnauthorizedException, createParamDecorator } from '@nestjs/common';

import { RequestUser } from '../models/request-user';

export const HttpUser = createParamDecorator((data, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  if (!req.user) {
    throw new UnauthorizedException('No user found for request');
  }
  return req.user as RequestUser;
});
