import { PrismaSelect } from '@paljs/plugins';

export function PrismaSelectArgs(info, args) {
  const select = new PrismaSelect(info).value;

  if (Object.keys(select.select).length > 0) {
    return {
      ...args,
      ...select,
    };
  }

  return args;
}
