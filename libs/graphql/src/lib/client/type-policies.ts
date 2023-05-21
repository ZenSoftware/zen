import { TypePolicies } from '@apollo/client/core';

import { sampleVar } from './cache';

/**
 * Implement Apollo client TypePolicy fields here
 * [Apollo docs](https://www.apollographql.com/docs/react/caching/cache-configuration/#typepolicy-fields)
 */
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
