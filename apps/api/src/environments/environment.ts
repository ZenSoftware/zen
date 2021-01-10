import dotenv from 'dotenv';

import { EnvironmentBase } from './environment.base';

dotenv.config();

export const environment: EnvironmentBase = {
  siteUrl: 'http://site.com',
  production: false,
  expressPort: 7080,
  publicRegistration: true,
  graphql: {
    playground: true, // localhost:7080/graphql
  },
  jwtOptions: {
    secret: 'dev secret',
    signOptions: {
      algorithm: 'HS256',
      /**
       * The client will exchange the token every 30 minutes during active sessions
       * See: `libs\common\src\lib\environment` for `EnvironmentCommonDev.jwtExchangeInterval`
       */
      expiresIn: 3600, // 1 hour (in seconds)
    },
  },
  expiresInRememberMe: 2592000, // 30 days (in seconds)
  cookie: {
    secure: false,
    sameSite: 'lax',
  },
  mail: {
    transport: `smtps://${process.env.SMTP_LOGIN}:${process.env.SMTP_PASSWORD}@${process.env.SMTP_SERVER}`,
    defaults: {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    },
  },
  throttle: {
    limit: 10,
    ttl: 60,
  },
};
