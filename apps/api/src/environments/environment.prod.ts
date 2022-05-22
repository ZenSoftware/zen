import { EnvironmentBase } from './environment.base';

export const environment: EnvironmentBase = {
  siteUrl: 'https://site.com',
  production: true,
  expressPort: process.env.PORT,
  publicRegistration: true,
  graphql: {
    sandbox: false,
    introspection: false,
    trace: false,
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
       * Refer to: `libs\common\src\lib\environment` for `EnvironmentProd.jwtExchangeInterval`
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
    limit: 10,
    ttl: 60,
    ignoreUserAgents: [/googlebot/gi, /bingbot/gi],
  },
  oauth: {
    loginConfirmedURL: 'http://site.com/#/login-confirmed',
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://api.site.com/auth/google/redirect',
    },
  },
  openTelemetry: {
    serviceName: 'zen-api',
    exporters: { enableOtlp: true },
    collectorOptions: {
      url: 'http://localhost:4318/v1/traces',
    },
  },
};
