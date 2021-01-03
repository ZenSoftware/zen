import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '../jwt';
import { PrismaModule } from '../prisma';
import { AuthService } from './auth.service';
import { GqlGuard } from './gql';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [JwtModule, PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthService, JwtStrategy, GqlGuard],
  exports: [JwtModule, PassportModule, GqlGuard, AuthService],
})
export class ZenAuthModule {}
