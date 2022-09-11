import { AuthSessionFields } from '@zen/graphql/fields';
import gql from 'graphql-tag';

export default gql`
  mutation AuthRegister($data: AuthRegisterInput!) {
    authRegister(data: $data) {
      ...AuthSessionFields
    }
  }

  ${AuthSessionFields}
`;
