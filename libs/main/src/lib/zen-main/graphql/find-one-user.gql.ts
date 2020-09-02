import { UserFields } from '@zen/graphql/fields';
import gql from 'graphql-tag';

export const QUERY = gql`
  query FindOneUser($where: UserWhereUniqueInput!) {
    findOneUser(where: $where) {
      ...UserFields
    }
  }

  ${UserFields}
`;
