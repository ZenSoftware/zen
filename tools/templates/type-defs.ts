export function TypeDefsTemplate(names: string[]) {
  let accum = `import { mergeTypeDefs } from '@graphql-tools/merge';

import SDLInputs from './sdl-inputs';
import User from './User/typeDefs';

export default mergeTypeDefs([
  SDLInputs,`;

  for (const name of names) {
    accum += `  ${name},\n`;
  }

  accum += `]);
`;

  return accum;
}
