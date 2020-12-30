import { AuthSessionFields } from '@zen/graphql';
import gql from 'graphql-tag';


export const AUTH_PASSWORD_RESET_CONFIRMATION = gql`
  mutation AuthPasswordResetConfirmation($data: AuthPasswordResetConfirmationInput!) {
    authPasswordResetConfirmation(data: $data)
  }

  ${AuthSessionFields}
`;
