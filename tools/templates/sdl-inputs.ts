export function SDLInputsTemplate(graphqlSDL: string) {
  return `import gql from 'graphql-tag';

export default gql\`
${graphqlSDL}
\`;`;
}
