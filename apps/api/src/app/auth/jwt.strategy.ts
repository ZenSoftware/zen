import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as ExReq } from 'express';
import { Strategy } from 'passport-jwt';

import { ConfigService } from '../config';
import { JwtPayload } from './jwt-payload';
import { RequestUser } from './request-user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly config: ConfigService) {
    super({
      secretOrKey: config.production
        ? config.jwtOptions.publicKey
        : config.jwtOptions.secret,
      jwtFromRequest: (req: ExReq & { token: any }) => {
        // Websocket connection
        if (req.token) return req.token;
        // HTTP request
        else return req.cookies['jwt'];
      },
    });
  }

  async validate(payload: JwtPayload) {
    let roles: string[] = [];
    if (payload.roles) {
      roles = payload.roles.split(',');
    }
    const user: RequestUser = { id: payload.id, roles };
    return user;
  }
}
