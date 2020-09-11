import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AuthModule } from '../auth';
import { MailModule } from '../mail';
import { PrismaModule } from '../prisma';
import { GqlConfigService } from './gql-config.service';
import { NEST_RESOLVERS } from './resolvers';

@Global()
@Module({
  imports: [
    AuthModule,
    PrismaModule,
    MailModule,
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
  ],
  providers: [...NEST_RESOLVERS],
})
export class ZenGraphQLModule {}
