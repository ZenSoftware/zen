import { Module } from '@nestjs/common';
import { NestAuthModule } from '@zen/nest-auth';

import { environment } from '../../environments/environment';
import { JwtModule } from '../jwt';
import { PrismaModule } from '../prisma';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CaslFactory } from './casl/casl.factory';
import { GoogleOAuthStrategy } from './strategies/google-oauth.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

const oauthProviders = [];
if (environment.oauth?.google?.clientID) oauthProviders.push(GoogleOAuthStrategy);

@Module({
  imports: [JwtModule, PrismaModule, NestAuthModule.register(CaslFactory)],
  providers: [JwtStrategy, AuthService, ...oauthProviders],
  exports: [JwtModule, AuthService, NestAuthModule],
  controllers: [AuthController],
})
export class ZenAuthModule {}
