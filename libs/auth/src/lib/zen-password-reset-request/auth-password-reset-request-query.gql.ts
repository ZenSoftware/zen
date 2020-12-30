import gql from 'graphql-tag';

export const AUTH_PASSWORD_RESET_REQUEST_QUERY = gql`
  query AuthPasswordResetRequestQuery($data: AuthPasswordResetRequestInput!) {
    authPasswordResetRequest(data: $data)
  }
`;
