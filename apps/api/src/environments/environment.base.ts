import { JwtModuleOptions } from '@nestjs/jwt';

export class EnvironmentBase {
  siteUrl: string;
  production: boolean;
  expressPort: string | number;
  graphql: {
    playground: boolean;
  };
  jwtOptions: JwtModuleOptions;
  rememberMeExpiresIn: number;
  cookieDomain: string;
  smtp: {
    server: string;
    login: string;
    password: string;
    fromName: string;
    fromEmail: string;
  };
}
