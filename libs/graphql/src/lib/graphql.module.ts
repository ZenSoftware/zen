import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ApolloClientOptions, ApolloLink, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { Environment } from '@zen/common';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpBatchLink } from 'apollo-angular/http';
import { createUploadLink } from 'apollo-upload-client';
import { OperationDefinitionNode } from 'graphql';
import * as Cookies from 'js-cookie';
import { cloneDeep, merge } from 'lodash-es';
import { SubscriptionClient } from 'subscriptions-transport-ws';

export abstract class GraphQLOptions {
  clientResolvers?: any;
  clientDefaults?: any;
  enableSubscriptions?: boolean;
  multipartMutations?: string[];
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpBatchLink, Environment, [new Optional(), GraphQLOptions]],
    },
  ],
})
export class GraphQLModule {
  static subscriptionClient: SubscriptionClient | null = null;

  constructor(@Optional() @SkipSelf() parentModule?: GraphQLModule) {
    if (parentModule) {
      throw new Error('GraphQLModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(options?: GraphQLOptions): ModuleWithProviders<GraphQLModule> {
    return {
      ngModule: GraphQLModule,
      providers: [
        {
          provide: GraphQLOptions,
          useValue: options,
        },
      ],
    };
  }

  static reconnectSubscriptionClient() {
    if (this.subscriptionClient) {
      this.subscriptionClient.close(true, true);
      (<any>this.subscriptionClient).connect();
      console.log('Re-connected websocket for subscription client for GraphQL');
    }
  }
}

export function createApollo(
  httpBatchLink: HttpBatchLink,
  env: Environment,
  options: GraphQLOptions
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
