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
      secretOrKey: config.production ? config.jwtOptions.publicKey : config.jwtOptions.secret,

      jwtFromRequest: (req: ExReq & { token: any }) => {
        // Websocket connection
        if (req.token) return req.token;
        // HTTP request
        else {
          const bearer = req.header('Authorization');
          if (bearer && bearer.startsWith('Bearer ')) return bearer.substring(7);
        }
      },
    });
  }

  async validate(payload: JwtPayload) {
    if (Date.now() >= payload.exp * 1000) throw new UnauthorizedException(undefined, 'Expired JWT');

    /* Deserialize roles as a string[] from the JWT payload */
    let roles: string[] = [];

    if (payload.roles) {
      let rolesString = payload.roles.trim();

      if (rolesString[0] !== '[' && rolesString[roles.length - 1] !== ']')
        throw new UnauthorizedException('JWT payload with property roles is not an array');

      // Remove array square brackets '[' and ']' from front and ends
      rolesString = rolesString.substr(1, rolesString.length - 2);
      roles = rolesString.split(',').map(r => {
        // Remove quotes around the role names
        return r.trim().substr(1, r.length - 2);
      });
    }

    const user: RequestUser = {
      id: payload.sub,
      roles,
    };
    return user;
  }
}
