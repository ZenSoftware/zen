import gql from 'graphql-tag';

export default gql`
  extend type Query {
    loggedIn: Boolean!
    userRoles: [String!]!
  }

  query LoggedIn {
    loggedIn @client
  }

  query UserRoles {
    userRoles @client
  }
`;
