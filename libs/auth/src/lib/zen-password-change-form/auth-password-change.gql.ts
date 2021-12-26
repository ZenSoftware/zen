import gql from 'graphql-tag';

gql`
  mutation AuthPasswordChange($data: AuthPasswordChangeInput!) {
    authPasswordChange(data: $data)
  }
`;
