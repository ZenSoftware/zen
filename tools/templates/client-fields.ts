export function ClientFieldsTemplate(name: string) {
  return `import gql from 'graphql-tag';

export const ${name}Fields = gql\`
  fragment ${name}Fields on ${name} {
    id
    # @todo Add fields
  }
\`;\n`;
}
