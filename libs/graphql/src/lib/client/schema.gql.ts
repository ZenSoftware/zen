import gql from 'graphql-tag';

const CLIENT_SCHEMA = gql`
  extend type Query {
    loggedIn: Boolean!
    userRoles: [Role!]!
  }

  query UserRoles {
    userRoles @client
  }

  query LoggedIn {
    loggedIn @client
  }
`;
