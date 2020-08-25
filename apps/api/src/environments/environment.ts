import * as dotenv from 'dotenv';

import { EnvironmentBase } from './environment.base';

dotenv.config();

export const environment: EnvironmentBase = {
  production: false,
  expressPort: 7080,
  graphql: {
    playground: true,
  },
  postgres: {
    host: 'localhost',
    port: 5445,
    user: 'ZenAdmin',
    password: 'temp',
    database: 'zen',
  },
  jwtOptions: {
    secret: 'dev secret',
    signOptions: {
      algorithm: 'HS256',
      expiresIn: 3600, // 1 hour (in seconds)
    },
  },
  rememberMeExpiresIn: 2592000, // 30 days (in seconds)
  cookieDomain: undefined,
};
