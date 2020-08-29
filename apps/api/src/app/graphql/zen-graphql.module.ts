import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { GqlConfigService } from './gql-config.service';
import { CommentResolver, GroupResolver, PostResolver, UserResolver } from './resolvers';

@Global()
@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
  ],
  providers: [CommentResolver, GroupResolver, PostResolver, UserResolver],
})
export class ZenGraphQLModule {}
