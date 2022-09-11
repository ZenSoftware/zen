import gql from 'graphql-tag';

export default gql`
  mutation AuthPasswordChange($data: AuthPasswordChangeInput!) {
    authPasswordChange(data: $data)
  }
`;
