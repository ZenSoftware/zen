import { createAccessibleByFactory } from '@casl/prisma/runtime';
import {
  ContextType,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

const accessibleBy = createAccessibleByFactory();

/**
 * Decorator to inject the Casl `accessibleBy` result
 * for the current user given Casl subject name as a paramater.
 */
export const CaslAccessible = createParamDecorator((data: string, context: ExecutionContext) => {
  if (typeof data !== 'string')
    throw new Error('CaslAccessible decorator requires a subject name for a parameter');

  let req;
  const type = context.getType() as ContextType & 'graphql';

  if (type === 'http') {
    req = context.switchToHttp().getRequest();
  } else if (type === 'graphql') {
    req = GqlExecutionContext.create(context).getContext().req;
  }

  if (!req.ability) throw new UnauthorizedException('No ability found for request');
  if (!req.accessibleWhere) req.accessibleWhere = accessibleBy(req.ability);

  try {
    return req.accessibleWhere[data];
  } catch (error) {
    throw new ForbiddenException(error);
  }
});
