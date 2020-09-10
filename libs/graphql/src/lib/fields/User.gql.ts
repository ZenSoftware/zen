import gql from 'graphql-tag';

export const UserFields = gql`
  fragment UserFields on User {
    id
    email
    firstName
    roles
    test
  }
`;
