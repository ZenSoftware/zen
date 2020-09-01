import { UserFields } from '@zen/graphql/fields';
import gql from 'graphql-tag';

export const QUERY = gql`
  query FindAnotherUser {
    findOneUser(where: { id: 2 }) {
      ...UserFields
    }
  }

  ${UserFields}
`;
