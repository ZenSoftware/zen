import { AbilityBuilder, AbilityClass } from '@casl/ability';
import { PrismaAbility } from '@casl/prisma';
import { Injectable } from '@nestjs/common';

import { RequestUser } from '../models/request-user';
import { ZenAbility } from './generated';

export enum Action {
  manage = 'manage',
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
}

const APP_ABILITY = PrismaAbility as AbilityClass<ZenAbility>;

@Injectable()
export class CaslAbilityFactory {
  createAbility(user: RequestUser) {
    const { can, cannot, build } = new AbilityBuilder(APP_ABILITY);

    if (user.roles.includes('Super')) {
      can(Action.manage, 'all'); // read-write access to everything
    } else {
      // Customize user permissions here
      can(Action.read, 'User', { id: user.id });
    }

    return build();
  }
}
