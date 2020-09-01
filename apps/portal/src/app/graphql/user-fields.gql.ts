import gql from 'graphql-tag';

export const UserFragment = gql`
  fragment UserFragment on User {
    id
    email
    name
  }
`;
