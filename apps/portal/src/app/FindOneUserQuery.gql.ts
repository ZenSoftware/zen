import gql from 'graphql-tag';

export const FIND_ONE_USER_QUERY = gql`
  query FindOneUserQuery {
    findOneUser(where: { id: 1 }) {
      id
      email
      name
    }
  }
`;
