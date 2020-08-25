import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { GqlConfigService } from './gql-config.service';
import { UserResolver } from './resolvers';

@Global()
@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
  ],
  providers: [UserResolver],
})
export class ZenGraphQLModule {}
