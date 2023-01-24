import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';

import { PalDefaultFields } from './default-fields';
import { Prisma } from './generated';

export function PrismaSelectArgs(
  info: GraphQLResolveInfo,
  args: object,
  defaultFields?: PalDefaultFields
) {
  const result = new PrismaSelect(info, {
    defaultFields: defaultFields as any,
    dmmf: [Prisma.dmmf],
  }).value;

  if (!result.select || Object.keys(result.select).length > 0) {
    return {
      ...args,
      ...result,
    };
  }

  return args;
}
