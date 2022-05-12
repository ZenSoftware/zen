import { Injectable } from '@nestjs/common';

import { RequestUser } from '../auth';
import { ConfigService } from '../config';
import { AuthSession } from '../graphql/models/auth-session';
import { JwtService } from '../jwt';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly config: ConfigService) {}

  getAuthSession(user: RequestUser, rememberMe = false): AuthSession {
    const jwtPayload: JwtPayload = {
      sub: user.id,
      roles: user.roles,
    };

    const expiresIn = rememberMe
      ? this.config.expiresInRememberMe
      : (this.config.jwtOptions.signOptions.expiresIn as number);

    const token = this.jwtService.sign(jwtPayload, { expiresIn });

    return {
      id: user.id,
      roles: user.roles,
      token,
      rememberMe,
      expiresIn,
    };
  }
}
