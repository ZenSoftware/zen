import { AuthSessionFields } from '@zen/graphql';
import gql from 'graphql-tag';

export const AUTH_REGISTER = gql`
  mutation AuthRegister($data: AuthRegisterInput!) {
    authRegister(data: $data) {
      ...AuthSessionFields
    }
  }

  ${AuthSessionFields}
`;
