import 'dotenv/config';

import { EnvironmentBase } from './environment.base';

export const environment: EnvironmentBase = {
  siteUrl: 'http://localhost:4200/#',
  production: false,
  expressPort: 7080,
  publicRegistration: true,
  cors: { credentials: true, origin: true },
  socketioPort: +process.env.SOCKETIO_PORT,
  graphql: {
    sandbox: true,
    introspection: true,
    trace: false,
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
       * Refer to: `libs\common\src\lib\environment` for `EnvironmentDev.jwtExchangeInterval`
       */
      expiresIn: 3600, // 1 hour (in seconds)
    },
  },
  expiresInRememberMe: 2592000, // 30 days (in seconds)
  mail: {
    transport: `smtps://${process.env.SMTP_LOGIN}:${process.env.SMTP_PASSWORD}@${process.env.SMTP_SERVER}`,
    defaults: {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    },
  },
  throttle: {
    limit: 2,
    ttl: 60,
    ignoreUserAgents: [/googlebot/gi, /bingbot/gi],
  },
  oauth: {
    loginConfirmedURL: 'http://localhost:4200/#/login-confirmed',
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:7080/auth/google/redirect',
      scope: ['email'],
    },
  },
};
