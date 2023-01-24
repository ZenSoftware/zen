export function DefaultFieldsTemplate(names: string[]) {
  let accum = `// This file is generated automatically. Do not edit it manually.
import { Prisma } from './generated';

export type DefaultFields = {\n`;

  for (const name of names) {
    accum += `  ${name}?: Prisma.${name}Select;\n`;
  }

  accum += `};\n`;

  return accum;
}
