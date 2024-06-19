import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { EnvironmentBase } from './environment.base';

const logger = new Logger('EnvironmentDevelopment');
dotenv.config();
logger.log(`.env file loaded`);

export const environment: EnvironmentBase = {
  siteUrl: 'http://localhost:4200/#',
  production: false,
  expressPort: 7080,
  helmet: false,
  publicRegistration: true,
  cors: { credentials: true, origin: true },
  graphql: {
    subscriptions: true,
    sandbox: true,
    introspection: true,
    csrfPrevention: true,
    uploads: {
      maxFileSize: 20_000_000, // 20 MB
      maxFiles: 5,
    },
  },
  jwtOptions: {
    secret: process.env.JWT_PRIVATE_KEY,
    signOptions: {
      algorithm: 'HS256',
      /**
       * The client will exchange the token every 30 minutes during active sessions
       * @see `libs\common\src\lib\environment` for `EnvironmentDev.jwtExchangeInterval`
       */
      expiresIn: 3600, // 1 hour (in seconds)
    },
  },
  expiresInRememberMe: 7_776_000, // 90 days (in seconds)
  mail: {
    // Docs: https://nodemailer.com/smtp/
    transport: {
      host: process.env.SMTP_SERVER,
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    defaults: {
      from: process.env.SMTP_FROM_NAME,
    },
  },
  throttle: {
    ignoreUserAgents: [/googlebot/gi, /bingbot/gi],
    throttlers: [
      {
        limit: 10,
        ttl: 30_000,
      },
    ],
  },
  bcrypt: {
    costFactor: 12,
    saltSize: 16,
  },
  oauth: {
    loginConfirmedURL: 'http://localhost:4200/#/login-confirmed',
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: 'http://localhost:7080/auth/google/redirect',
      scope: ['email'],
    },
  },
};
