import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import {
  ApolloServerPluginInlineTraceDisabled,
  Context,
  PluginDefinition,
} from 'apollo-server-core';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { print } from 'graphql';
import { GraphQLUpload } from 'graphql-upload-minimal';

import { ConfigService } from '../config';
import { PrismaService } from '../prisma';
import { IContext } from './models';
import { ALL_TYPE_DEFS } from './resolvers';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private readonly config: ConfigService, private readonly prisma: PrismaService) {}

  createGqlOptions(): ApolloDriverConfig {
    const plugins: PluginDefinition[] = [];
    if (this.config.graphql.sandbox) plugins.push(ApolloServerPluginLandingPageLocalDefault);
    if (!this.config.graphql.trace) plugins.push(ApolloServerPluginInlineTraceDisabled());

    return {
      typeDefs: print(ALL_TYPE_DEFS),
      resolvers: { Upload: GraphQLUpload },
      debug: !this.config.production,
      playground: false,
      plugins,
      introspection: this.config.graphql.introspection,
      cors: this.config.cors,
      csrfPrevention: this.config.graphql.csrfPrevention,
      cache: 'bounded',
      installSubscriptionHandlers: this.config.graphql.subscriptions,
      subscriptions: this.config.graphql.subscriptions
        ? {
            'graphql-ws': {
              onConnect: (context: Context<any>) => {
                const { connectionParams, extra } = context;
                extra.token = connectionParams.token;
              },
            },
          }
        : undefined,
      context: async (ctx): Promise<IContext> => {
        // Subscriptions pass through JWT token for authentication
        if (ctx.extra) return { req: ctx.extra, prisma: this.prisma };
        // Queries, Mutations
        else return { ...ctx, prisma: this.prisma };
      },
    };
  }
}
