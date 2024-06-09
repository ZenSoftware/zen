export function PaljsTypeDefsTemplate(names: string[]) {
  let accum = `import { mergeTypeDefs } from '@graphql-tools/merge';

import InputTypes from './InputTypes';
import SchemaExtensions from './SchemaExtensions';
`;

  for (const name of names) {
    accum += `import ${name} from './${name}/typeDefs';\n`;
  }

  accum += `\nexport default mergeTypeDefs([
  InputTypes,
  SchemaExtensions,\n`;

  for (const name of names) {
    accum += `  ${name},\n`;
  }

  accum += `]);
`;

  return accum;
}
