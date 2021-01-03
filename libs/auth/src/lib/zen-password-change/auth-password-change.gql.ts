import gql from 'graphql-tag';

export const AUTH_PASSWORD_CHANGE = gql`
  mutation AuthPasswordChange($data: AuthPasswordChangeInput!) {
    authPasswordChange(data: $data)
  }
`;
