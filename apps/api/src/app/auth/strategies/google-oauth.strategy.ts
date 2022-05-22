import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

import { ConfigService } from '../../config';
import { PrismaService } from '../../prisma';
import { RequestUser } from '../models/request-user';

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(config: ConfigService, private readonly prisma: PrismaService) {
    super({
      clientID: config.oauth.google.clientId,
      clientSecret: config.oauth.google.clientSecret,
      callbackURL: config.oauth.google.callbackURL,
      scope: ['email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    let user = await this.prisma.user.findFirst({ where: { googleId: profile.id } });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: profile.emails[0].value,
          googleId: profile.id,
        },
      });
    }

    const reqUser: RequestUser = {
      id: user.id,
      roles: user.roles,
    };

    return reqUser;
  }
}
