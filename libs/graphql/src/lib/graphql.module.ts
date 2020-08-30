import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { Environment } from '@zen/common';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

export function createApollo(httpLink: HttpLink, env: Environment): ApolloClientOptions<any> {
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
      deps: [HttpLink, Environment],
    },
  ],
})
export class GraphQLModule {}
