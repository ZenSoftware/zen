import { Injectable } from '@nestjs/common';
import { CookieOptions, Response } from 'express';

import { RequestUser } from '../auth';
import { ConfigService } from '../config';
import { AuthSession } from '../graphql/models/auth-session';
import { JwtService } from '../jwt';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService
  ) {}

  setJwtCookie(res: Response, user: RequestUser, rememberMe: boolean | string = false) {
    if (typeof rememberMe === 'string') {
      rememberMe = rememberMe === 'true';
    }

    const jwtPayload: JwtPayload = {
      id: user.id,
      roles: user.roles ? user.roles.toString() : undefined,
    };

    const expiresIn = rememberMe
      ? this.config.rememberMeExpiresIn
      : (this.config.jwtOptions.signOptions.expiresIn as number);
    const maxAge = expiresIn * 1000;
    const token = this.jwtService.sign(jwtPayload, { expiresIn });

    const cookieOptions: CookieOptions = {
      maxAge,
      secure: this.config.production,
      sameSite: this.config.production ? 'strict' : 'lax',
      domain: this.config.cookieDomain,
    };

    res.cookie('jwt', token, cookieOptions);
    res.cookie('rememberMe', rememberMe, cookieOptions);

    const response: AuthSession = {
      id: user.id,
      maxAge: maxAge.toString(),
      roles: user.roles,
      rememberMe,
    };
    return response;
  }
}
