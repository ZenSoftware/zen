import gql from 'graphql-tag';

export default gql`
  query AuthPasswordResetRequestQuery($data: AuthPasswordResetRequestInput!) {
    authPasswordResetRequest(data: $data)
  }
`;
