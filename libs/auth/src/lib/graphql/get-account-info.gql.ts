import { AccountInfoFields } from '@zen/graphql/fields';
import gql from 'graphql-tag';

export default gql`
  query GetAccountInfo {
    accountInfo {
      ...AccountInfoFields
    }
  }

  ${AccountInfoFields}
`;
