// This file is generated automatically. Do not edit it manually.
import { Prisma } from './generated';

type BoolOnly<T> = {
  [P in keyof T]: boolean;
};

export type PrismaSelections = {
  User?: BoolOnly<Prisma.UserSelect>;
};
