import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ApolloClientOptions, ApolloLink, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition, getOperationName } from '@apollo/client/utilities';
import { Environment } from '@zen/common';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { BatchOptions, HttpBatchLink } from 'apollo-angular/http';
import { UploadLinkOptions, createUploadLink } from 'apollo-upload-client';
import { OperationDefinitionNode } from 'graphql';
import * as Cookies from 'js-cookie';
import { cloneDeep, merge } from 'lodash-es';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import { commonResolvers } from './common-resolvers';

export abstract class GraphQLOptions {
  clientResolvers?: any;
  enableSubscriptions?: boolean;
  uploadMutations?: string[];
  uploadOptions?: UploadLinkOptions & { mutations: string[] };
  batchOptions?: BatchOptions;
  websocketOptions?: WebSocketLink.Configuration;
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
      throw new Error('GraphQLModule is already loaded. Import it in the AppModule only.');
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

  const batchOptions = options?.batchOptions
    ? options.batchOptions
    : {
        uri: env.url.graphql,
        withCredentials: true,
        batchMax: 250,
      };

  const batch_link = httpBatchLink.create(batchOptions);

  if (!options) {
    links.push(batch_link);
  } else {
    const uploadLinkOptions = options?.uploadOptions
      ? options.uploadOptions
      : {
          uri: env.url.graphql,
          credentials: 'include',
        };

    if (options.enableSubscriptions) {
      const websocketOptions = options?.websocketOptions
        ? options.websocketOptions
        : {
            uri: env.url.graphqlSubscriptions,

            options: {
              reconnect: true,
              connectionParams: () => ({ token: Cookies.get('jwt') }),
            },
          };

      const websocket_link = new WebSocketLink(websocketOptions);

      GraphQLModule.subscriptionClient = (<any>websocket_link).subscriptionClient;

      const websocket_batch_link = split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        websocket_link,
        batch_link
      );

      if (!options.uploadMutations) {
        links.push(websocket_batch_link);
      } else {
        const upload_link = createUploadLink(uploadLinkOptions);

        const upload_websocket_batch_link = split(
          ({ query }) =>
            (options.uploadMutations as string[]).includes(getOperationName(query) as string),
          upload_link,
          websocket_batch_link
        );

        links.push(upload_websocket_batch_link);
      }
    } else {
      if (!options.uploadMutations) {
        links.push(batch_link);
      } else {
        const upload_link = createUploadLink(uploadLinkOptions);

        const upload_batch_link = split(
          ({ query }) =>
            (options.uploadMutations as string[]).includes(getOperationName(query) as string),
          upload_link,
          batch_link
        );

        links.push(upload_batch_link);
      }
    }
  }

  const resolvers = cloneDeep(commonResolvers);

  if (options?.clientResolvers) merge(resolvers, options.clientResolvers);

  const cache = new InMemoryCache();

  return { link: ApolloLink.from(links), cache, resolvers };
}
