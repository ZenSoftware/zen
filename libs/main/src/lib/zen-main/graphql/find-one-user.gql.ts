import { UserFields } from '@zen/graphql/fields';
import gql from 'graphql-tag';

export const QUERY = gql`
  query FindOneUser {
    findOneUser(where: { id: 1 }) {
      ...UserFields
    }
  }

  ${UserFields}
`;
