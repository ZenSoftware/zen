import { SetMetadata } from '@nestjs/common';

export const ALLOW_ANONYMOUS_KEY = 'AllowAnonymous';

/**
 * Allows access for non-authenticated users to individual endpoints.
 * Works with both `RolesGuard` and `CaslGuard`.
 * The following will allow non-authenticated users access to the `getBlog` endpoint,
 * but require a user to have the `Moderator` role for the `editBlog` endpoint.
 * ```ts
 * ＠Controller('blog')
 * ＠UseGuards(RolesGuard('Moderator'))
 * export class BlogController {
 *   ＠Get()
 *   ＠AllowAnonymous()
 *   getBlog() { ... }
 *
 *   ＠Put()
 *   editBlog() { ... }
 * }
 * ```
 */
export const AllowAnonymous = () => SetMetadata(ALLOW_ANONYMOUS_KEY, true);
