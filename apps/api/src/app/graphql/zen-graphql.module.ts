import { ApolloDriver } from '@nestjs/apollo';
import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ZenAuthModule } from '../auth';
import { ConfigModule } from '../config';
import { MailModule } from '../mail';
import { PrismaModule } from '../prisma';
import { GqlConfigService } from './gql-config.service';
import { ALL_RESOLVERS } from './resolvers';

@Global()
@Module({
  imports: [
    ZenAuthModule,
    MailModule,
    PrismaModule,
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useClass: GqlConfigService,
      imports: [PrismaModule, ConfigModule],
    }),
  ],
  providers: [...ALL_RESOLVERS],
})
export class ZenGraphQLModule {}
