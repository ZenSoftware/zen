import { Logger } from '@nestjs/common';

import { EnvironmentBase } from './environment.base';

const logger = new Logger('EnvironmentProduction');
logger.log(`loaded`);

export const environment: EnvironmentBase = {
  siteUrl: 'https://site.com/#',
  production: true,
  expressPort: process.env.PORT as string,
  publicRegistration: true,
  graphql: {
    subscriptions: true,
    sandbox: false,
    introspection: false,
    csrfPrevention: true,
    uploads: {
      maxFileSize: 20_000_000, // 20 MB
      maxFiles: 5,
    },
  },
  jwtOptions: {
    secret: process.env.JWT_PRIVATE_KEY,
    publicKey: process.env.JWT_PUBLIC_KEY,
    signOptions: {
      algorithm: 'ES256',
      /**
       * The client will exchange the token every 30 minutes during active sessions
       * @see `libs\common\src\lib\environment` for `EnvironmentProd.jwtExchangeInterval`
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
    limit: 10,
    ttl: 60,
    ignoreUserAgents: [/googlebot/gi, /bingbot/gi],
  },
  bcryptCost: 12,
  oauth: {
    loginConfirmedURL: 'https://site.com/#/login-confirmed',
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: 'https://api.site.com/auth/google/redirect',
      scope: ['email'],
    },
  },
  openTelemetry: {
    serviceName: 'zen-api',
    exporters: { enableOtlp: true },
    traceExporter: {
      url: 'http://localhost:4318/v1/traces',
    },
  },
};
