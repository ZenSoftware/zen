import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';

export function PrismaSelectArgs(info: GraphQLResolveInfo, args: any) {
  const result = new PrismaSelect(info).value;

  if (!result.select || Object.keys(result.select).length > 0) {
    return {
      ...args,
      ...result,
    };
  }

  return args;
}
