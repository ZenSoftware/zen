import { JwtModuleOptions } from '@nestjs/jwt';
import { CookieOptions } from 'express';

export class EnvironmentBase {
  siteUrl: string;
  cookie: Omit<CookieOptions, 'maxAge'>;
  production: boolean;
  expressPort: string | number;
  graphql: {
    playground: boolean;
  };
  jwtOptions: JwtModuleOptions;
  rememberMeExpiresIn: number;
  smtp: {
    server: string;
    login: string;
    password: string;
    fromName: string;
    fromEmail: string;
  };
}
