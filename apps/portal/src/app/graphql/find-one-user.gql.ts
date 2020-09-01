import gql from 'graphql-tag';

import { UserFragment } from './user-fields.gql';

export const QUERY = gql`
  query FindOneUser {
    findOneUser(where: { id: 1 }) {
      ...UserFragment
    }
  }

  ${UserFragment}
`;
