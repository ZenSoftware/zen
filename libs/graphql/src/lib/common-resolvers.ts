import { InMemoryCache } from '@apollo/client/core';

export const commonResolvers = {
  Mutation: {
    loggedInUpdate: (
      _: any,
      { loggedIn }: { loggedIn: boolean },
      { cache }: { cache: InMemoryCache }
    ) => {
      // cache.write({query: ..., variables: ...});
      return loggedIn;
    },
  },
};
