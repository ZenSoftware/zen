import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { GqlConfigService } from './gql-config.service';
import { ALL_RESOLVERS } from './resolvers';

@Global()
@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
  ],
  providers: [...ALL_RESOLVERS],
})
export class ZenGraphQLModule {}
