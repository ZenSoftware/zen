import { AuthSessionFields } from '@zen/graphql/fields';
import gql from 'graphql-tag';

gql`
  mutation AuthPasswordResetConfirmation($data: AuthPasswordResetConfirmationInput!) {
    authPasswordResetConfirmation(data: $data) {
      ...AuthSessionFields
    }
  }

  ${AuthSessionFields}
`;
