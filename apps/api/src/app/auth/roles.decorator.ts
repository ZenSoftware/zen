import { SetMetadata } from '@nestjs/common';
import { Role } from '@zen/api-interfaces';

export const Roles = (...roles: Array<Role | string>) => SetMetadata('roles', roles);
