import { TypePolicies } from '@apollo/client/core';

import { loggedInVar, userRolesVar } from './cache';

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
