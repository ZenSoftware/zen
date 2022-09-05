import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { environment } from '../../environments/environment';
import { JwtModule } from '../jwt';
import { PrismaModule } from '../prisma';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CaslAbilityFactory } from './casl/casl-ability.factory';
import { GoogleOAuthStrategy } from './strategies/google-oauth.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

const oauthProviders = [];
if (environment.oauth?.google?.clientID) oauthProviders.push(GoogleOAuthStrategy);

@Module({
  imports: [JwtModule, PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, AuthService, CaslAbilityFactory, ...oauthProviders],
  exports: [JwtModule, PassportModule, AuthService, CaslAbilityFactory],
  controllers: [AuthController],
})
export class ZenAuthModule {}
