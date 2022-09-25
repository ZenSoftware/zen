import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Action } from '@zen/api-interfaces';

import { RequestUser } from '../models/request-user';
import { PrismaSubjects } from './generated';

/** @description A union of subjects to extend the ability beyond just Prisma models */
export type ExtendedSubjects = 'all';

@Injectable()
export class CaslAbilityFactory {
  async createAbility(user: RequestUser) {
    const prismaRules = this.#prismaRules(user);
    const extendedRules = this.#extendedRules(user);
    return createMongoAbility(prismaRules.concat(extendedRules as any));
  }

  #prismaRules(user: RequestUser) {
    const { can, cannot, rules } = new AbilityBuilder(
      createPrismaAbility<[Action, PrismaSubjects]>
    );

    // Customize user permissions over Prisma models here

    return rules;
  }

  #extendedRules(user: RequestUser) {
    const { can, cannot, rules } = new AbilityBuilder(
      createMongoAbility<[Action, PrismaSubjects | ExtendedSubjects]>
    );

    if (user.roles.includes('Super')) {
      can('manage', 'all');
    }

    // Customize extended user permissions here

    return rules;
  }
}
