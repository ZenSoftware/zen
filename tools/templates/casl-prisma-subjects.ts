export function CaslPrismaSubjectsTemplate(names: string[]) {
  let accum = `// This file is generated automatically. Do not edit it manually.
import { Subjects } from '@casl/prisma';
  
import {\n`;

  for (const name of names) {
    accum += `  ${name},\n`;
  }

  accum += `} from '../../prisma';

export type PrismaSubjects = Subjects<{
`;

  for (const name of names) {
    accum += `  ${name}: ${name};\n`;
  }

  accum += `}>;\n`;

  return accum;
}
