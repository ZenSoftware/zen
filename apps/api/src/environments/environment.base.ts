import { JwtModuleOptions } from '@nestjs/jwt';
import { PoolConfig as PostgreSQLConfig } from 'pg';

export class EnvironmentBase {
  production: boolean;
  expressPort: string | number;
  graphql: {
    playground: boolean;
  };
  postgres: PostgreSQLConfig;
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
