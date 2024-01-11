/**
 * Author: Peter Hoang
 * Company: Zen Software
 * License: MIT - Open source
 */
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
  InMemoryCacheConfig,
  NormalizedCacheObject,
  split,
} from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition, getOperationName } from '@apollo/client/utilities';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloModule } from 'apollo-angular';
import { BatchOptions, HttpBatchLink, HttpBatchLinkHandler } from 'apollo-angular/http';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { OperationDefinitionNode } from 'graphql';
import { ClientOptions, createClient } from 'graphql-ws';

export abstract class GraphQLOptions {
  resolvers?: ApolloClientOptions<NormalizedCacheObject>['resolvers'];
  cacheOptions?: InMemoryCacheConfig;
  uploadOptions?: Parameters<typeof createUploadLink>[0] & { mutationNames: string[] };
  batchOptions?: BatchOptions;
  websocketOptions?: ClientOptions;
}

@NgModule({
  imports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpBatchLink, GraphQLOptions],
    },
  ],
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

export function createApollo(
  httpBatchLink: HttpBatchLink,
  options: GraphQLOptions
): ApolloClientOptions<NormalizedCacheObject> {
  let link: ApolloLink;

  let batch_link: HttpBatchLinkHandler;
  if (options.batchOptions) batch_link = httpBatchLink.create(options.batchOptions);
  else throw Error('No GraphQLOptions.batchOptions provided. You must set at least the uri.');

  if (!options.websocketOptions) {
    if (!options.uploadOptions) {
      link = batch_link;
    } else {
      if (!options.uploadOptions.mutationNames)
        throw new Error(
          'GraphQLOptions.uploadOptions.mutationNames required when providing uploadOptions to list the mutation names to be sent as multi-part requests.'
        );

      const upload_link = createUploadLink(options.uploadOptions);

      const upload_batch_link = split(
        ({ query }) =>
          options.uploadOptions!.mutationNames.includes(getOperationName(query) as string),
        upload_link,
        batch_link
      );

      link = upload_batch_link;
    }
  } else {
    const wsClient = createClient(options.websocketOptions);
    const websocket_link = new GraphQLWsLink(wsClient);

    const websocket_batch_link = split(
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
      const upload_link = createUploadLink(options.uploadOptions);

      const upload_websocket_batch_link = split(
        ({ query }) =>
          options.uploadOptions!.mutationNames.includes(getOperationName(query) as string),
        upload_link,
        websocket_batch_link
      );

      link = upload_websocket_batch_link;
    }
  }

  return {
    link,
    cache: new InMemoryCache(options.cacheOptions),
    resolvers: options.resolvers,
  };
}
