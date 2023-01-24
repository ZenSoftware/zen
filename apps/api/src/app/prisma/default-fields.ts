// This file is generated automatically. Do not edit it manually.
import { Prisma } from './generated';

export type DefaultFields = {
  User?: Prisma.UserSelect;
};

type ExctractSelections<T> = {
  [P in keyof T]?: T[P] | ((select: T[P]) => T[P]);
};

export type PaljsDefaultFields = ExctractSelections<DefaultFields>;
