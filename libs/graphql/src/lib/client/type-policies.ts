import { TypePolicies } from '@apollo/client/core';

import { sampleVar } from './cache';

export const typePolicies: TypePolicies = {
  Query: {
    fields: {
      sample: {
        read() {
          return sampleVar();
        },
      },
    },
  },
};
