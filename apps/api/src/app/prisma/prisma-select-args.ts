import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';

import { Prisma } from './generated';
import { PrismaSelections } from './prisma-selections';

export function PrismaSelectArgs(
  info: GraphQLResolveInfo,
  args: object,
  defaultFields?: PrismaSelections
) {
  const result = new PrismaSelect(info, { defaultFields, dmmf: [Prisma.dmmf] }).value;

  if (!result.select || Object.keys(result.select).length > 0) {
    return {
      ...args,
      ...result,
    };
  }

  return args;
}
