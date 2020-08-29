import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { PrismaService } from '../../prisma';
import { User, UserWhereUniqueInput } from '../prisma';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(returns => User)
  async user(@Args('where', { type: () => UserWhereUniqueInput }) where: UserWhereUniqueInput) {
    return this.prisma.user.findOne({ where });
  }

  @Query(returns => User)
  async userById(@Args('id', { type: () => Int }) id: number) {
    return this.prisma.user.findOne({ where: { id: id } });
  }
}
