import { Injectable } from '@nestjs/common';
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
      secretOrKey: config.production ? config.jwtOptions.publicKey : config.jwtOptions.secret,

      jwtFromRequest: (req: ExReq & { token: any }) => {
        // Websocket connection
        if (req.token) return req.token;
        // HTTP request

        let authHeader = req.header('Authorization');
        if (!authHeader) authHeader = req.header('authorization');

        if (authHeader?.startsWith('Bearer ') || authHeader?.startsWith('bearer ')) {
          return authHeader.substring(7);
        }
      },
    });
  }

  async validate(payload: JwtPayload) {
    const user: RequestUser = {
      id: payload.sub,
      roles: payload.roles,
    };
    return user;
  }
}
