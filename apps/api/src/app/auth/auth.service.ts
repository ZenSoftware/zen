import { randomUUID } from 'crypto';

import { Inject, Injectable } from '@nestjs/common';
import { CASL_FACTORY_TOKEN, JwtPayload, RequestUser } from '@zen/nest-auth';
import type { ICaslFactory } from '@zen/nest-auth';

import { ConfigService } from '../config';
import { AuthSession } from '../graphql/models/auth-session';
import { JwtService } from '../jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly jwtStrategy: JwtStrategy,
    private readonly config: ConfigService,
    @Inject(CASL_FACTORY_TOKEN) private readonly caslFactory: ICaslFactory
  ) {}

  async getAuthSession(user: RequestUser, rememberMe = false) {
    const jwtPayload: JwtPayload = {
      jti: randomUUID(),
      aud: this.config.siteUrl,
      sub: user.id,
      roles: user.roles,
    };

    const expiresIn = rememberMe
      ? this.config.expiresInRememberMe
      : (this.config.jwtOptions.signOptions.expiresIn as number);

    const token = this.jwtService.sign(jwtPayload, { expiresIn });

    const ability = await this.caslFactory.createAbility(user);

    const authSession: AuthSession = {
      userId: user.id,
      roles: user.roles,
      rules: ability.rules,
      token,
      rememberMe,
      expiresIn,
    };

    return authSession;
  }

  async createAbility(user: RequestUser) {
    return this.caslFactory.createAbility(user);
  }

  /**
   * @returns `RequestUser` if valid and `null` otherwise
   */
  async authorizeJwt(token: string) {
    const jwtPayload = this.jwtService.decode(token) as JwtPayload;
    return this.jwtStrategy.validate(jwtPayload);
  }
}
