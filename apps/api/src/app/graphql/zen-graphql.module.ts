import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ZenAuthModule } from '../auth';
import { MailModule } from '../mail';
import { PrismaModule } from '../prisma';
import { GqlConfigService } from './gql-config.service';
import { NEST_RESOLVERS } from './resolvers';

@Global()
@Module({
  imports: [
    ZenAuthModule,
    PrismaModule,
    MailModule,
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
  ],
  providers: [...NEST_RESOLVERS],
})
export class ZenGraphQLModule {}
