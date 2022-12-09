import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';

import { Prisma } from './generated';

export function PrismaSelectArgs(info: GraphQLResolveInfo, args: any) {
  const result = new PrismaSelect(info, { dmmf: [Prisma.dmmf] }).value;

  if (!result.select || Object.keys(result.select).length > 0) {
    return {
      ...args,
      ...result,
    };
  }

  return args;
}
