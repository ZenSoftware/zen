export function DefaultFieldsTemplate(names: string[]) {
  let accum = `// This file is generated automatically. Do not edit it manually.
import { Prisma } from './generated';

export type DefaultFields = {\n`;

  for (const name of names) {
    accum += `  ${name}?: Prisma.${name}Select;\n`;
  }

  accum += `};

type ExctractSelections<T> = {
  [P in keyof T]?: T[P] | ((select: T[P]) => T[P]);
};

export type PaljsDefaultFields = ExctractSelections<DefaultFields>;
`;

  return accum;
}
