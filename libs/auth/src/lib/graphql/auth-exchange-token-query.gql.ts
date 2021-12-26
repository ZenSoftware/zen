import { AuthSessionFields } from '@zen/graphql/fields';
import gql from 'graphql-tag';

gql`
  query AuthExchangeToken($data: AuthExchangeTokenInput!) {
    authExchangeToken(data: $data) {
      ...AuthSessionFields
    }
  }

  ${AuthSessionFields}
`;
