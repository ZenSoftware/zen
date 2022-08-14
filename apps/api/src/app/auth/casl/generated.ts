import { PrismaAbility, Subjects } from '@casl/prisma';
import { User } from '@prisma/client';

export type ZenAbility = PrismaAbility<
  [
    string,
    Subjects<{
      User: User;
    }>
  ]
>;
