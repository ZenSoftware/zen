import { AbilityBuilder, PureAbility } from '@casl/ability';
import { Action, Role } from '@zen/common';
import { CaslFactory, RequestUser } from '@zen/nest-auth';

import { PrismaQuery, createPrismaAbility } from './casl-prisma';
import { PrismaSubjects } from './generated';

/** A union of subjects to extend the ability beyond just Prisma models */
type ExtendedSubjects = 'all';
export type AppSubjects = PrismaSubjects | ExtendedSubjects;
export type AppAbility = PureAbility<[Action, AppSubjects], PrismaQuery>;

export class AppCaslFactory extends CaslFactory {
  async createAbility(user: RequestUser & { roles: Role[] }) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

    if (user.roles.includes('Super')) {
      can('manage', 'all');
    } else {
      // ... Customize user permissions here
    }

    return build();
  }
}
