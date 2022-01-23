import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloServerPluginInlineTrace, PluginDefinition } from 'apollo-server-core';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { print } from 'graphql';

import { ConfigService } from '../config';
import { PrismaService } from '../prisma';
import { IContext } from './models';
import { ALL_TYPE_DEFS } from './resolvers';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private readonly config: ConfigService, private readonly prisma: PrismaService) {}

  createGqlOptions(): GqlModuleOptions {
    const plugins: PluginDefinition[] = [];
    if (this.config.graphql.sandbox) plugins.push(ApolloServerPluginLandingPageLocalDefault);
    if (this.config.graphql.trace) plugins.push(ApolloServerPluginInlineTrace());

    return {
      typeDefs: print(ALL_TYPE_DEFS),
      installSubscriptionHandlers: true,
      debug: !this.config.production,
      playground: false,
      plugins,
      introspection: this.config.graphql.introspection,
      cors: this.config.cors,
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: connectionParams => {
            return {
              prisma: this.prisma,
              req: { token: connectionParams.token }, // Include WebSocketLink context for JwtStrategy
            };
          },
        },
      },
      context: async (ctx): Promise<IContext> => {
        return { ...ctx, prisma: this.prisma };
      },
    };
  }
}
