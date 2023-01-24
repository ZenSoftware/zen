import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';

import { DefaultFields } from './default-fields';
import { Prisma } from './generated';

export function PrismaSelectArgs(
  info: GraphQLResolveInfo,
  args: object,
  defaultFields?: DefaultFields
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
