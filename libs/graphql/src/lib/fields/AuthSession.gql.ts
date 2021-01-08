import gql from 'graphql-tag';

export const AuthSessionFields = gql`
  fragment AuthSessionFields on AuthSession {
    id
    maxAge
    rememberMe
    roles
  }
`;
