import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { mergeTypes } from 'merge-graphql-schemas';

import { ConfigService } from '../config';
import { createContext } from './context';
import prismaTypeDefs from './prisma/typeDefs';
import extendedTypeDefs from './schema-extended.gql';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createGqlOptions(): GqlModuleOptions {
    return {
      typeDefs: mergeTypes([prismaTypeDefs, extendedTypeDefs]),
      installSubscriptionHandlers: true,
      debug: !this.config.production,
      playground: this.config.graphql.playground,
      introspection: this.config.graphql.playground,
      tracing: this.config.graphql.playground,
      cors: this.config.production ? undefined : { credentials: true, origin: true },
      context: ctx => {
        return ctx.connection
          ? { ...ctx, req: ctx.connection.context, ...createContext() }
          : { ...ctx, ...createContext() };
      },
      uploads: {
        maxFileSize: 20_000_000, // 20 MB
        maxFiles: 5,
      },
    };
  }
}
