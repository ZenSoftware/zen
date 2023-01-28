import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { RequestUser } from '@zen/nest-auth';
import { Profile, Strategy } from 'passport-google-oauth20';

import { ConfigService } from '../../config';
import { PrismaService } from '../../prisma';
import { EmailTakenException } from './email-taken-exception.filter';

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(config: ConfigService, private readonly prisma: PrismaService) {
    super(config.oauth!.google);
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    let user = await this.prisma.user.findFirst({ where: { googleId: profile.id } });

    if (!user) {
      const googleEmail = profile.emails![0].value;

      const existingUserWithGoogleEmail = await this.prisma.user.findFirst({
        where: {
          email: { equals: googleEmail, mode: 'insensitive' },
        },
      });

      if (existingUserWithGoogleEmail) {
        throw new EmailTakenException();
      }

      user = await this.prisma.user.create({
        data: {
          email: googleEmail,
          googleId: profile.id,
          googleProfile: profile._json,
        },
      });

      Logger.log(`Registered new user via Google signup: ${googleEmail}`);
    } else {
      this.prisma.user.update({
        where: { id: user.id },
        data: { googleProfile: profile._json },
      });
    }

    const reqUser: RequestUser = {
      id: user.id,
      roles: user.roles,
    };

    return reqUser;
  }
}
