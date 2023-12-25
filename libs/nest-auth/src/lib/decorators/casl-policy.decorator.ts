import { PureAbility } from '@casl/ability';
import { SetMetadata } from '@nestjs/common';

export type CaslPolicyHandler = (ability: PureAbility<any, any>) => boolean;
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
