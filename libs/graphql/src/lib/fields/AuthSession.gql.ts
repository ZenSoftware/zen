import gql from 'graphql-tag';

export const AuthSessionFields = gql`
  fragment AuthSessionFields on AuthSession {
    userId
    token
    rememberMe
    roles
    expiresIn
    rules
  }
`;
