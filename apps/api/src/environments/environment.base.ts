import { MailerOptions } from '@nest-modules/mailer';
import { JwtModuleOptions } from '@nestjs/jwt';
import { FileUploadOptions } from 'apollo-server-core';
import { CookieOptions } from 'express';
import { ThrottlerModuleOptions } from 'nestjs-throttler';

export class EnvironmentBase {
  readonly siteUrl: string;
  readonly cookie: Omit<CookieOptions, 'maxAge'>;
  readonly production: boolean;
  readonly expressPort: string | number;
  readonly graphql: {
    readonly playground: boolean;
    readonly uploads: boolean | FileUploadOptions;
  };
  readonly publicRegistration: boolean;
  readonly jwtOptions: JwtModuleOptions;
  readonly expiresInRememberMe: number;
  readonly mail: Omit<MailerOptions, 'template'>;
  readonly throttle: ThrottlerModuleOptions;
}
