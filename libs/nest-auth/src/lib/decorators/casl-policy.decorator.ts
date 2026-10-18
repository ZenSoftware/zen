import { Ability } from '@casl/ability';
import { SetMetadata } from '@nestjs/common';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type CaslPolicyHandler = (ability: Ability<any, any>) => boolean;
export const CASL_POLICY_KEY = 'CaslPolicy';

/**
 * Decorator to be applied to a class or method to specify authorization.
 * Works with Nest controllers and GraphQL resolvers.
 *
 * @example
 * ```ts
 * ＠UseGuards(CaslGuard)
 * ＠CaslPolicy((ability: AppAbility) => ability.can('read', 'Blog'))
 * async getBlogs() { ... }
 * ```
 */
export const CaslPolicy = (...handlers: CaslPolicyHandler[]) =>
  SetMetadata(CASL_POLICY_KEY, handlers);
