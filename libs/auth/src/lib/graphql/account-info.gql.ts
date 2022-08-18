import { AccountInfoFields } from '@zen/graphql/fields';
import gql from 'graphql-tag';

gql`
  query GetAccountInfo {
    accountInfo {
      ...AccountInfoFields
    }
  }

  ${AccountInfoFields}
`;
