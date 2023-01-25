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
 * Parameter decorator that provides the CASL `accessibleBy` result for the current user.
 * Requires a string as a paramater that is the Prisma model name.
 * It will provide a Prisma `WhereInput` for that subject that can be utilized within a Prisma query.
 * Works with either HTTP or GraphQL requests.
 * Refer to the [CASL Prisma docs](https://casl.js.org/v6/en/package/casl-prisma).
 * ```ts
 * ＠UseGuards(CaslGuard)
 * sample(＠CaslAccessible('Post') accessiblePosts: Prisma.PostWhereInput) { ... }
 * ```
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
