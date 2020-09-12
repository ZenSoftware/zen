import { AuthSessionFields } from '@zen/graphql/fields';
import gql from 'graphql-tag';

export const AUTH_LOGIN = gql`
  query AuthLogin($data: AuthLoginInput!) {
    authLogin(data: $data) {
      ...AuthSessionFields
    }
  }

  ${AuthSessionFields}
`;
