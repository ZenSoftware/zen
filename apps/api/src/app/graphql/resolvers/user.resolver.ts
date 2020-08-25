import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { PrismaService } from '../../prisma';
import { User } from '../models';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(returns => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.prisma.user.findOne({ where: { id: id } });
  }
}
