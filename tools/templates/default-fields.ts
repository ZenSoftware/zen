export function DefaultFieldsTemplate(names: string[]) {
  let accum = `// This file is generated automatically. Do not edit it manually.
import { Prisma } from './generated';

export type DefaultFields = {\n`;

  for (const name of names) {
    accum += `  readonly ${name}?: Prisma.${name}Select;\n`;
  }

  accum += `};

type WithFuncSelect<T> = {
  [P in keyof T]?: T[P] | ((select: T[P]) => T[P]);
};

export type PalDefaultFields = WithFuncSelect<DefaultFields>;
`;

  return accum;
}
