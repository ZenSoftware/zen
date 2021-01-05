import { Injectable } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { print } from 'graphql';

import { ConfigService } from '../config';
import { PrismaService } from '../prisma';
import { IContext } from './models';
import { ALL_TYPE_DEFS } from './resolvers';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private readonly config: ConfigService, private moduleRef: ModuleRef) {}

  createGqlOptions(): GqlModuleOptions {
    return {
      typeDefs: print(ALL_TYPE_DEFS),
      installSubscriptionHandlers: true,
      debug: !this.config.production,
      playground: this.config.graphql.playground,
      introspection: this.config.graphql.playground,
      tracing: this.config.graphql.playground,
      cors: this.config.production ? undefined : { credentials: true, origin: true },
      context: async (ctx): Promise<IContext> => {
        const prisma = await this.moduleRef.get(PrismaService, { strict: false });

        return ctx.connection
          ? { ...ctx, prisma, req: ctx.connection.context as { token: string } } // Include WebSocketLink context for JwtStrategy
          : { ...ctx, prisma };
      },
      uploads: {
        maxFileSize: 20_000_000, // 20 MB
        maxFiles: 5,
      },
    };
  }
}
