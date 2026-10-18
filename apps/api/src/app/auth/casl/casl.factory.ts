import { AbilityBuilder } from '@casl/ability';
import { Role } from '@zen/common';
import { CaslFactory, RequestUser } from '@zen/nest-auth';

import { AppAbility, createPrismaAbility } from './casl-prisma';

export class AppCaslFactory extends CaslFactory {
  async createAbility(user: RequestUser & { roles: Role[] }) {
    const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

    if (user.roles.includes('Super')) {
      can('manage', 'all');
    } else {
      // ... Customize user permissions here
    }

    return build();
  }
}
