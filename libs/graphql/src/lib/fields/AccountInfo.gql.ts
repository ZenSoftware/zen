import gql from 'graphql-tag';

import { GoogleProfileFields } from './GoogleProfile.gql';

export const AccountInfoFields = gql`
  fragment AccountInfoFields on AccountInfo {
    username
    hasPassword
    googleProfile {
      ...GoogleProfileFields
    }
  }

  ${GoogleProfileFields}
`;
