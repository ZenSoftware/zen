import { Injectable } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { print } from 'graphql';

import { ConfigService } from '../config';
import { PrismaService } from '../prisma';
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
      context: async ctx => {
        const prisma = this.moduleRef.get(PrismaService, { strict: false });

        return ctx.connection
          ? { ...ctx, req: ctx.connection.context, prisma }
          : { ...ctx, prisma };
      },
      uploads: {
        maxFileSize: 20_000_000, // 20 MB
        maxFiles: 5,
      },
    };
  }
}
