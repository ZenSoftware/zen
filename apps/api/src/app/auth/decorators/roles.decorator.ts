import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Decorator for authorization that grants permissions for users in roles
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
