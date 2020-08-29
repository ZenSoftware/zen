import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';

import { ConfigService } from '../config';
import { Context, createContext } from './context';
import typeDefs from './prisma/typeDefs';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createGqlOptions(): GqlModuleOptions {
    return {
      typeDefs: typeDefs,
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

const middleware = async (resolve, root, args, context: Context, info: GraphQLResolveInfo) => {
  const result = new PrismaSelect(info).value;
  if (!result.select || Object.keys(result.select).length > 0) {
    args = {
      ...args,
      ...result,
    };
  }
  return resolve(root, args, context, info);
};
