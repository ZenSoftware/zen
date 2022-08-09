import { AbilityBuilder, AbilityClass } from '@casl/ability';
import { PrismaAbility, Subjects } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { RequestUser } from '../models/request-user';

export enum Action {
  manage = 'manage',
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
}

type AppAbility = PrismaAbility<
  [
    string,
    Subjects<{
      User: User;
    }>
  ]
>;

const APP_ABILITY = PrismaAbility as AbilityClass<AppAbility>;

@Injectable()
export class CaslAbilityFactory {
  createAbility(user: RequestUser) {
    const { can, cannot, build } = new AbilityBuilder(APP_ABILITY);

    if (user.roles.includes('Super')) {
      can(Action.manage, 'all'); // read-write access to everything
    } else {
      can(Action.read, 'User', { id: user.id });
    }

    return build();
  }
}
