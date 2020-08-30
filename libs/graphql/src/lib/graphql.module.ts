import { NgModule } from '@angular/core';
import { ApolloClientOptions, ApolloLink, InMemoryCache, split } from '@apollo/client/core';
import { Environment } from '@zen/common';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpBatchLink } from 'apollo-angular/http';

export function createApollo(
  httpBatchLink: HttpBatchLink,
  env: Environment
): ApolloClientOptions<any> {
  const links: ApolloLink[] = [];

  const batch_link = httpBatchLink.create({
    uri: env.url.graphql,
    withCredentials: true,
    batchMax: 500,
  });

  links.push(batch_link);

  return { link: ApolloLink.from(links), cache: new InMemoryCache() };
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
