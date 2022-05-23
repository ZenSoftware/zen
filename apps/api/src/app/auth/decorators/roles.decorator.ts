import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = 'roles';

/**
 * Decorator for authorization that grants permissions for users in roles
 */
export const Roles = (...roles: Array<Role>) => SetMetadata(ROLES_KEY, roles);
