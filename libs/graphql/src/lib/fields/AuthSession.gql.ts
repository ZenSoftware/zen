import gql from 'graphql-tag';

export const AuthSessionFields = gql`
  fragment AuthSessionFields on AuthSession {
    id
    token
    rememberMe
    roles
    expiresIn
    rules
  }
`;
