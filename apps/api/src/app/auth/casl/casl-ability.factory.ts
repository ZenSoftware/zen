import { AbilityBuilder, PureAbility } from '@casl/ability';
import { PrismaQuery, createPrismaAbility } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Action } from '@zen/api-interfaces';
import { ICaslAbilityFactory, RequestUser } from '@zen/nest-auth';

import { PrismaSubjects } from './generated';

/** @description A union of subjects to extend the ability beyond just Prisma models */
export type ExtendedSubjects = 'all';
export type AppAbility = PureAbility<[Action, PrismaSubjects | ExtendedSubjects], PrismaQuery>;

@Injectable()
export class CaslAbilityFactory implements ICaslAbilityFactory {
  async createAbility(user: RequestUser) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

    if (user.roles.includes('Super')) {
      can('manage', 'all');
    }

    // Customize user permissions here

    return build();
  }
}
