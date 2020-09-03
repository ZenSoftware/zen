module.exports = Name => {
  return `import gql from 'graphql-tag';

export const ${Name}Fields = gql\`
  fragment ${Name}Fields on ${Name} {
    id
  }
\`;\n`;
};
