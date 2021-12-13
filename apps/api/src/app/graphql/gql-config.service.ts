import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
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
    return {
      typeDefs: print(ALL_TYPE_DEFS),
      installSubscriptionHandlers: true,
      // subscriptions: { 'graphql-ws': true },
      debug: !this.config.production,
      playground: false,
      plugins: this.config.graphql.sandbox
        ? [ApolloServerPluginLandingPageLocalDefault]
        : undefined,
      introspection: this.config.graphql.introspection,
      cors: this.config.cors,
      context: async (ctx): Promise<IContext> => {
        return ctx.connection
          ? {
              ...ctx,
              prisma: this.prisma,
              req: ctx.connection.context as { token: string }, // Include WebSocketLink context for JwtStrategy
            }
          : { ...ctx, prisma: this.prisma };
      },
    };
  }
}
