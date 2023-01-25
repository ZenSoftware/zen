import { AbilityBuilder, PureAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action, Role } from '@zen/common';
import { CaslFactory, RequestUser } from '@zen/nest-auth';

import type { DefaultFields } from '../../prisma';
import { PrismaQuery, createPrismaAbility } from './casl-prisma';
import type { PrismaSubjects } from './generated';

/** A union of subjects to extend the ability beyond just Prisma models */
type ExtendedSubjects = 'all';
export type AppSubjects = PrismaSubjects | ExtendedSubjects;
export type AppAbility = PureAbility<[Action, AppSubjects], PrismaQuery>;

/**
 * Default fields to include for Prisma queries to ensure that they exist during authorization.
 * Any fields that Casl ability rules are based on should be included here.
 * [Pal.js Select docs](https://paljs.com/plugins/select/#api)
 */
export const defaultFields: DefaultFields = {
  // ... Add default fields here
} as const;

@Injectable()
export class AppCaslFactory extends CaslFactory {
  async createAbility(user: RequestUser) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

    if (user.roles.includes('Super')) {
      can('manage', 'all');
    }

    // ... Customize user permissions here

    return build();
  }
}
