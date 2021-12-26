import { AuthSessionFields } from '@zen/graphql/fields';
import gql from 'graphql-tag';

gql`
  query AuthLogin($data: AuthLoginInput!) {
    authLogin(data: $data) {
      ...AuthSessionFields
    }
  }

  ${AuthSessionFields}
`;
