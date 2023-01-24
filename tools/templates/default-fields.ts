export function DefaultFieldsTemplate(names: string[]) {
  let accum = `// This file is generated automatically. Do not edit it manually.
import { Prisma } from './generated';

type BoolOnly<T> = {
  [P in keyof T]: boolean;
};

export type DefaultFields = {\n`;

  for (const name of names) {
    accum += `  ${name}?: BoolOnly<Prisma.${name}Select>;\n`;
  }

  accum += `};\n`;

  return accum;
}
