import { CanActivate, ExecutionContext, HttpException, Injectable, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export function containsNestedCreate(args: any) {
  if (args !== null && args !== undefined) {
    for (const [key, value] of Object.entries(args)) {
      if (key === 'create') {
        return true;
      }

      if (typeof value === 'object' && containsNestedCreate(value) === true) {
        return true;
      }
    }
  }

  return false;
}

@Injectable()
/**
 * Rejects mutations with nested create argument
 */
export class RejectNestedCreateGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    if (ctx.getInfo()?.operation?.operation === 'mutation') {
      const args = ctx.getArgs();
      if (containsNestedCreate(args)) {
        const errorMessage = 'Nested create arguments for mutations are forbidden';
        const req = ctx.getContext()?.req;
        Logger.error(errorMessage, {
          userId: req?.user?.id,
          ip: req?.ip,
          class: ctx.getClass()?.name,
          handler: ctx.getHandler()?.name,
          args: args?.data,
        });
        throw new HttpException(errorMessage, 403);
      }
    }

    return true;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
