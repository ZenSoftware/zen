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
 * Decorator to provide the Casl `accessibleBy` result for the current user.
 * Requires a subject name string as a paramater and will provide the WhereInput for that subject.
 * [@casl/prisma docs](https://casl.js.org/v6/en/package/casl-prisma)
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
  if (!req.accessibleWhereInputs) req.accessibleWhereInputs = accessibleBy(req.ability);

  try {
    return req.accessibleWhereInputs[data];
  } catch (error) {
    throw new ForbiddenException(error);
  }
});
