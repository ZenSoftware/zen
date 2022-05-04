import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '../jwt';
import { PrismaModule } from '../prisma';
import { AuthService } from './auth.service';
import { GqlGuard, GqlThrottlerGuard, HttpGuard, RejectNestedCreateGuard } from './guards';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [JwtModule, PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    JwtStrategy,
    AuthService,
    GqlGuard,
    GqlThrottlerGuard,
    HttpGuard,
    RejectNestedCreateGuard,
  ],
  exports: [
    JwtModule,
    PassportModule,
    AuthService,
    GqlGuard,
    GqlThrottlerGuard,
    HttpGuard,
    RejectNestedCreateGuard,
  ],
})
export class ZenAuthModule {}
