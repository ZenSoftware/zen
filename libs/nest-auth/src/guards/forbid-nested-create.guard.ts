import { CanActivate, ExecutionContext, HttpException, Logger, mixin } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

type Options = { allow: string[] };

export function containsNestedCreate(args: any, options: Options = undefined) {
  if (args !== null && args !== undefined) {
    for (const [key, value] of Object.entries(args)) {
      if (options?.allow.includes(key)) {
        continue;
      }

      if (key === 'create') {
        return true;
      }

      if (typeof value === 'object' && containsNestedCreate(value, options) === true) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Rejects mutations with nested create arguments
 * @param options - Field `allow` lists an array of field names to ignore within the Apollo args
 */
export const ForbidNestedCreateGuard = (options: Options = undefined) => {
  class ForbidNestedCreateGuardMixin implements CanActivate {
    async canActivate(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);

      if (ctx.getInfo()?.operation?.operation === 'mutation') {
        const args = ctx.getArgs();

        if (containsNestedCreate(args, options)) {
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

  return mixin(ForbidNestedCreateGuardMixin);
};
