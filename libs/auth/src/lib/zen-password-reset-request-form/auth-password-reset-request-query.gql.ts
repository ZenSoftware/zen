import gql from 'graphql-tag';

gql`
  query AuthPasswordResetRequestQuery($data: AuthPasswordResetRequestInput!) {
    authPasswordResetRequest(data: $data)
  }
`;
