import dotenv from 'dotenv';

import { EnvironmentBase } from './environment.base';

dotenv.config();

export const environment: EnvironmentBase = {
  siteUrl: 'http://site.com',
  production: false,
  expressPort: 7080,
  graphql: {
    playground: true, // localhost:7080/graphql
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
  smtp: {
    server: process.env.SMTP_SERVER,
    login: process.env.SMTP_LOGIN,
    password: process.env.SMTP_PASSWORD,
    fromName: process.env.SMTP_FROM_NAME,
    fromEmail: process.env.SMTP_FROM_EMAIL,
  },
};
