import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { environment } from '../../environments/environment';
import { JwtModule } from '../jwt';
import { PrismaModule } from '../prisma';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleOAuthStrategy } from './strategies/google-oauth.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

const oauthProviders = [];
if (environment.oauth?.google?.clientId) oauthProviders.push(GoogleOAuthStrategy);

@Module({
  imports: [JwtModule, PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, AuthService, ...oauthProviders],
  exports: [JwtModule, PassportModule, AuthService],
  controllers: [AuthController],
})
export class ZenAuthModule {}
