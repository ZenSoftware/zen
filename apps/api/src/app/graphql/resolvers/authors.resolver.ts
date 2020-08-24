import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { Author } from '../models';

@Resolver(of => Author)
export class AuthorsResolver {
  constructor() {}

  @Query(returns => Author)
  async author(@Args('id', { type: () => Int }) id: number) {
    const author: Author = {
      id: -1,
      firstName: 'Peter',
    };
    return author;
  }
}
