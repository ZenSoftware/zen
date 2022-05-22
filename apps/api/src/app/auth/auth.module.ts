import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '../jwt';
import { PrismaModule } from '../prisma';
import { AuthService } from './auth.service';
import { GoogleOAuthStrategy } from './strategies/google-oauth.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [JwtModule, PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [GoogleOAuthStrategy, JwtStrategy, AuthService],
  exports: [JwtModule, PassportModule, AuthService],
})
export class ZenAuthModule {}
