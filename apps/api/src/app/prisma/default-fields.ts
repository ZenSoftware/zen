// This file is generated automatically. Do not edit it manually.
import { Prisma } from './generated';

type BoolOnly<T> = {
  [P in keyof T]: T[P] extends boolean ? boolean : never;
};

export type DefaultFields = {
  User?: BoolOnly<Prisma.UserSelect>;
};
