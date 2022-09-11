import { SetMetadata } from '@nestjs/common';
import { Role } from '@zen/api-interfaces';

export const ROLES_KEY = 'roles';

/**
 * Decorator for authorization that grants permissions for users in roles
 */
export const Roles = (...roles: Array<keyof typeof Role>) => SetMetadata(ROLES_KEY, roles);
