import { PrismaSelect as PalPrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';

import { Prisma } from './generated';

export function PrismaSelectArgs(info: GraphQLResolveInfo, args: object) {
  const result = new PalPrismaSelect(info, { dmmf: [Prisma.dmmf] }).value;

  if (!result.select || Object.keys(result.select).length > 0) {
    return {
      ...args,
      ...result,
    };
  }

  return args;
}
