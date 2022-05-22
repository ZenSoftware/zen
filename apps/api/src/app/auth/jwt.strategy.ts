import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ApiError } from '@zen/api-interfaces';
import { Request as ExReq } from 'express';
import { Strategy } from 'passport-jwt';

import { ConfigService } from '../config';
import { JwtPayload } from './jwt-payload';
import { RequestUser } from './request-user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(readonly config: ConfigService) {
    super({
      secretOrKey: config.jwtOptions.publicKey
        ? config.jwtOptions.publicKey
        : config.jwtOptions.secret,

      jwtFromRequest: (req: ExReq & { token: any }) => {
        // Websocket connection
        if (req.token) return req.token;
        // HTTP request
        let authHeader = req.header('Authorization');
        if (!authHeader) authHeader = req.header('authorization');
        if (!authHeader) throw new HttpException(ApiError.JwtStrategy.NO_AUTH_HEADER, 400);

        // Strips `'Bearer '` and returns only the token
        return authHeader.substring(7);
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
