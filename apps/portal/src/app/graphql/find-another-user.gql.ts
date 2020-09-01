import gql from 'graphql-tag';

import { UserFragment } from './user-fields.gql';

export const QUERY = gql`
  query FindAnotherUser {
    findOneUser(where: { id: 2 }) {
      ...UserFragment
    }
  }

  ${UserFragment}
`;
