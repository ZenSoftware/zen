import { Injectable } from '@nestjs/common';
import { CookieOptions, Response } from 'express';

import { RequestUser } from '../auth';
import { ConfigService } from '../config';
import { AuthSession } from '../graphql/models/auth-session';
import { JwtService } from '../jwt';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly config: ConfigService) {}

  getAuthSession(
    res: Response,
    user: RequestUser,
    rememberMe: boolean | string = false
  ): AuthSession {
    if (typeof rememberMe === 'string') {
      rememberMe = rememberMe === 'true';
    }

    const jwtPayload: JwtPayload = {
      id: user.id,
      roles: user.roles ? user.roles.toString() : undefined,
    };

    const expiresIn = rememberMe
      ? this.config.expiresInRememberMe
      : (this.config.jwtOptions.signOptions.expiresIn as number);
    const maxAge = expiresIn * 1000;
    const token = this.jwtService.sign(jwtPayload, { expiresIn });

    return {
      id: user.id,
      token,
      roles: user.roles,
      rememberMe,
      maxAge: maxAge.toString(),
    };
  }

  setJwtCookie(
    res: Response,
    user: RequestUser,
    rememberMe: boolean | string = false
  ): AuthSession {
    if (typeof rememberMe === 'string') {
      rememberMe = rememberMe === 'true';
    }

    const jwtPayload: JwtPayload = {
      id: user.id,
      roles: user.roles ? user.roles.toString() : undefined,
    };

    const expiresIn = rememberMe
      ? this.config.expiresInRememberMe
      : (this.config.jwtOptions.signOptions.expiresIn as number);
    const maxAge = expiresIn * 1000;
    const token = this.jwtService.sign(jwtPayload, { expiresIn });

    const cookieOptions: CookieOptions = {
      ...this.config.cookie,
      maxAge,
    };

    res.cookie('jwt', token, cookieOptions);
    res.cookie('rememberMe', rememberMe, cookieOptions);

    return {
      id: user.id,
      token,
      roles: user.roles,
      rememberMe,
      maxAge: maxAge.toString(),
    };
  }
}
