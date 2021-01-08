module.exports = name => {
  return `import gql from 'graphql-tag';

export const ${name}Fields = gql\`
  fragment ${name}Fields on ${name} {
    id
    # TODO: Add fields
  }
\`;\n`;
};
