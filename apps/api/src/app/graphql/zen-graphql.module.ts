import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { GqlConfigService } from './gql-config.service';
import { AuthorsResolver } from './resolvers/authors.resolver';

@Global()
@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
  ],
  providers: [AuthorsResolver],
})
export class ZenGraphQLModule {}
