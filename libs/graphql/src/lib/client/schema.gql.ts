import gql from 'graphql-tag';

const CLIENT_SCHEMA = gql`
  extend type Query {
    loggedIn: Boolean!
    userRoles: [Role!]!
  }

  query LoggedIn {
    loggedIn @client
  }

  query UserRoles {
    userRoles @client
  }
`;
