import { randomUUID } from 'crypto';

import { Injectable } from '@nestjs/common';

import { ConfigService } from '../config';
import { AuthSession } from '../graphql/models/auth-session';
import { JwtService } from '../jwt';
import { CaslAbilityFactory } from './casl/casl-ability.factory';
import { JwtPayload } from './models/jwt-payload';
import { RequestUser } from './models/request-user';
import { JwtStrategy } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly jwtStrategy: JwtStrategy,
    private readonly config: ConfigService,
    private readonly caslAbilityFactory: CaslAbilityFactory
  ) {}

  getAuthSession(user: RequestUser, rememberMe = false): AuthSession {
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

    const ability = this.caslAbilityFactory.createAbility(user);

    return {
      id: user.id,
      roles: user.roles,
      rules: ability.rules,
      token,
      rememberMe,
      expiresIn,
    };
  }

  /**
   * @returns `RequestUser` if valid and `null` otherwise
   */
  async authorizeJwt(token: string) {
    const jwtPayload = this.jwtService.decode(token) as JwtPayload;
    return this.jwtStrategy.validate(jwtPayload);
  }
}
