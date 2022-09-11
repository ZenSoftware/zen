import { AuthSessionFields } from '@zen/graphql/fields';
import gql from 'graphql-tag';

export default gql`
  mutation AuthPasswordResetConfirmation($data: AuthPasswordResetConfirmationInput!) {
    authPasswordResetConfirmation(data: $data) {
      ...AuthSessionFields
    }
  }

  ${AuthSessionFields}
`;
