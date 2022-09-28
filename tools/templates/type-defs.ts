export function TypeDefsTemplate(names: string[]) {
  let accum = `import { mergeTypeDefs } from '@graphql-tools/merge';

import SDLInputs from './sdl-inputs';
`;

  for (const name of names) {
    accum += `import ${name} from './${name}/typeDefs';\n`;
  }

  accum += `export default mergeTypeDefs([
  SDLInputs,`;

  for (const name of names) {
    accum += `  ${name},\n`;
  }

  accum += `]);
`;

  return accum;
}
