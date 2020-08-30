import { PrismaSelect } from '@paljs/plugins';

export default function PrismaSelectArgs(info, args) {
  const result = new PrismaSelect(info).value;

  if (!result.select || Object.keys(result.select).length > 0) {
    return {
      ...args,
      ...result,
    };
  }

  return args;
}
