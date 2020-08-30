import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { Environment } from '@zen/common';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpBatchLink } from 'apollo-angular/http';

export function createApollo(httpLink: HttpBatchLink, env: Environment): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri: env.appUrl.graphql }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpBatchLink, Environment],
    },
  ],
})
export class GraphQLModule {}
