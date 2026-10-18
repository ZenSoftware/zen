/**
 * Custom PrismaClient output path requires a custom casl-prisma.ts file
 * Code copied from https://casl.js.org/v7/en/package/casl-prisma
 */

import {
  accessibleBy,
  createPrismaAbility,
  ParsingQueryError,
  PrismaModel,
  prismaQuery,
  type Model,
  type PrismaQueryOf,
  type Subjects,
  type WhereInputOf,
} from '@casl/prisma/runtime';
import type { Prisma, User } from '../../prisma/generated';
import { Ability } from '@casl/ability';
import { Action } from '@zen/common';

export { accessibleBy, createPrismaAbility, ParsingQueryError, prismaQuery };

export type PrismaQuery<T extends PrismaModel = Model<any, any>> =
  PrismaQueryOf<Prisma.TypeMap, T>;
export type WhereInput<TModelName extends Prisma.ModelName> =
  WhereInputOf<Prisma.TypeMap, TModelName>;
export type AppSubjects = Subjects<{
  User: User,
}>;

export type AppAbility = Ability<[Action, 'all' | AppSubjects], PrismaQuery>