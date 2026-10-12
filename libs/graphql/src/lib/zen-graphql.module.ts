/* eslint-disable  @typescript-eslint/no-non-null-assertion */

import { ModuleWithProviders, NgModule, Optional, SkipSelf, inject } from '@angular/core';
import { ApolloClient, ApolloLink, InMemoryCache, InMemoryCacheConfig } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { getOperationName } from '@apollo/client/utilities/internal';
import { provideApollo } from 'apollo-angular';
import { HttpBatchLink, HttpBatchLinkHandler } from 'apollo-angular/http';
import UploadHttpLink from 'apollo-upload-client/UploadHttpLink.mjs';
import { OperationDefinitionNode } from 'graphql';
import { ClientOptions, createClient } from 'graphql-ws';

export abstract class GraphQLOptions {
  cacheOptions?: InMemoryCacheConfig;
  uploadOptions?: ConstructorParameters<typeof UploadHttpLink>[0] & {
    /** An array of operation names to be sent via the upload link. */
    operationNames: string[];
  };
  batchOptions?: HttpBatchLink.Options;
  websocketOptions?: ClientOptions;
}

@NgModule({
  providers: [provideApollo(createApollo)],
})
export class ZenGraphQLModule {
  constructor(@Optional() @SkipSelf() parentModule?: ZenGraphQLModule) {
    if (parentModule) {
      throw new Error('ZenGraphQLModule is already loaded. Import it in the AppModule only.');
    }
  }

  static forRoot(options: GraphQLOptions): ModuleWithProviders<ZenGraphQLModule> {
    return {
      ngModule: ZenGraphQLModule,
      providers: [
        {
          provide: GraphQLOptions,
          useValue: options,
        },
      ],
    };
  }
}

export function createApollo(): ApolloClient.Options {
  const httpBatchLink = inject(HttpBatchLink);
  const options = inject(GraphQLOptions);

  let link: ApolloLink;

  let batch_link: HttpBatchLinkHandler;
  if (options.batchOptions) batch_link = httpBatchLink.create(options.batchOptions);
  else throw Error('No GraphQLOptions.batchOptions provided. You must set at least the uri.');

  if (!options.websocketOptions) {
    if (!options.uploadOptions) {
      link = batch_link;
    } else {
      if (!options.uploadOptions.operationNames)
        throw new Error(
          'GraphQLOptions.uploadOptions.operationNames required when providing uploadOptions to filter the operations to be sent as multi-part requests.'
        );

      const upload_link = new UploadHttpLink(options.uploadOptions);

      const upload_batch_link = ApolloLink.split(
        ({ query }) =>
          options.uploadOptions!.operationNames.includes(getOperationName(query) as string),
        upload_link,
        batch_link
      );

      link = upload_batch_link;
    }
  } else {
    const wsClient = createClient(options.websocketOptions);
    const websocket_link = new GraphQLWsLink(wsClient);

    const websocket_batch_link = ApolloLink.split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      websocket_link,
      batch_link
    );

    if (!options.uploadOptions) {
      link = websocket_batch_link;
    } else {
      const upload_link = new UploadHttpLink(options.uploadOptions);

      const upload_websocket_batch_link = ApolloLink.split(
        ({ query }) =>
          options.uploadOptions!.operationNames.includes(getOperationName(query) as string),
        upload_link,
        websocket_batch_link
      );

      link = upload_websocket_batch_link;
    }
  }

  return {
    link,
    cache: new InMemoryCache(options.cacheOptions),
  };
}
