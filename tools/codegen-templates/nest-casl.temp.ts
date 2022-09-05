export function NestCaslTemplate(prismaNames: string[]) {
  let accum = `import { PrismaAbility, Subjects } from '@casl/prisma';
import { 
`;

  for (const name of prismaNames) {
    accum += `  ${name},\n`;
  }

  accum += `} from '@prisma/client';

export type ZenAbility = PrismaAbility<
  [
    string,
    Subjects<{
`;

  for (const name of prismaNames) {
    accum += `      ${name}: ${name};\n`;
  }

  accum += `    }>
  ]
>;
`;

  return accum;
}
