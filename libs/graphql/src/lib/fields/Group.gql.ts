import gql from 'graphql-tag';

export const GroupFields = gql`
  fragment GroupFields on Group {
    id
  }
`;
