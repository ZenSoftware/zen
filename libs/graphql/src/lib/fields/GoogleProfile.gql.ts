import gql from 'graphql-tag';

export const GoogleProfileFields = gql`
  fragment GoogleProfileFields on GoogleProfile {
    name
    picture
  }
`;
