import { AuthSessionFields } from '@zen/graphql/fields';
import gql from 'graphql-tag';

export const AUTH_EXCHANGE_TOKEN = gql`
  query AuthExchangeToken {
    authExchangeToken {
      ...AuthSessionFields
    }
  }

  ${AuthSessionFields}
`;
