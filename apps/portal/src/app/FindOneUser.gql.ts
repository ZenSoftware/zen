import gql from 'graphql-tag';

export const FIND_ONE_USER = gql`
  query FindOneUser {
    findOneUser(where: { id: 1 }) {
      id
      email
      name
    }
  }
`;
