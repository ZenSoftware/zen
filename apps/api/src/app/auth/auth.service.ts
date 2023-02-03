import { randomUUID } from 'crypto';

import { Injectable } from '@nestjs/common';
import { CaslFactory, JwtPayload, RequestUser } from '@zen/nest-auth';

import { ConfigService } from '../config';
import { AuthSession } from '../graphql/models/auth-session';
import { JwtService } from '../jwt';
import { accessibleBy } from './casl/casl-prisma';
import { AppAbility } from './casl/casl.factory';
import { JwtStrategy } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly jwtStrategy: JwtStrategy,
    private readonly config: ConfigService,
    private readonly caslFactory: CaslFactory
  ) {}

  async getAuthSession(user: RequestUser, rememberMe = false): Promise<AuthSession> {
    const jwtPayload: JwtPayload = {
      jti: randomUUID(),
      aud: this.config.siteUrl,
      sub: user.id,
      roles: user.roles,
    };

    const expiresIn = rememberMe
      ? this.config.expiresInRememberMe
      : (this.config.jwtOptions.signOptions!.expiresIn as number);

    const token = this.jwtService.sign(jwtPayload, { expiresIn });

    const ability = await this.createAbility(user);

    return {
      userId: user.id,
      roles: user.roles,
      rules: ability.rules,
      token,
      rememberMe,
      expiresIn,
    };
  }

  async createAbility(user: RequestUser): Promise<AppAbility> {
    return this.caslFactory.createAbility(user);
  }

  accessibleBy = accessibleBy;

  /**
   * @returns `RequestUser` if valid and `null` otherwise
   */
  async authorizeJwt(token: string): Promise<RequestUser | null> {
    const jwtPayload = this.jwtService.decode(token) as JwtPayload;
    return this.jwtStrategy.validate(jwtPayload);
  }
}
