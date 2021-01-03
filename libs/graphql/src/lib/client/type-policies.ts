import { TypePolicies } from '@apollo/client/core';
import gql from 'graphql-tag';

import { loggedInVar, userRolesVar } from './cache';

const ClientTypeDef = gql`
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

export const typePolicies: TypePolicies = {
  Query: {
    fields: {
      loggedIn: {
        read() {
          return loggedInVar();
        },
      },
      userRoles: {
        read() {
          return userRolesVar();
        },
      },
    },
  },
};
