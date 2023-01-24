export function PrismaSelectionsTemplate(names: string[]) {
  let accum = `// This file is generated automatically. Do not edit it manually.
import { Prisma } from './generated';

type BoolOnly<T> = {
  [P in keyof T]: T[P] extends boolean ? boolean : never;
};

export type PrismaSelections = {\n`;

  for (const name of names) {
    accum += `  ${name}?: BoolOnly<Prisma.${name}Select>;\n`;
  }

  accum += `};\n`;

  return accum;
}
