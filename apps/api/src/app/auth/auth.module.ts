import { Module, Provider } from '@nestjs/common';
import { NestAuthModule } from '@zen/nest-auth';

import { environment } from '../../environments/environment';
import { JwtModule } from '../jwt';
import { PrismaModule } from '../prisma';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authFieldsProvider } from './casl/auth-fields';
import { AppCaslFactory } from './casl/casl.factory';
import { GoogleOAuthStrategy } from './strategies/google-oauth.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

const oauthProviders: Provider[] = [];
if (environment.oauth?.google?.clientID) oauthProviders.push(GoogleOAuthStrategy);

@Module({
  imports: [JwtModule, PrismaModule, NestAuthModule.register(AppCaslFactory)],
  providers: [JwtStrategy, AuthService, authFieldsProvider, ...oauthProviders],
  exports: [JwtModule, AuthService, NestAuthModule, authFieldsProvider],
  controllers: [AuthController],
})
export class ZenAuthModule {}
