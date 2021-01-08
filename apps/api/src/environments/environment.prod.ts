import { EnvironmentBase } from './environment.base';

export const environment: EnvironmentBase = {
  siteUrl: 'https://site.com',
  production: true,
  expressPort: process.env.PORT,
  graphql: {
    playground: false,
  },
  jwtOptions: {
    privateKey: process.env.JWT_PRIVATE_KEY,
    publicKey: process.env.JWT_PUBLIC_KEY,
    signOptions: {
      algorithm: 'RS256',
      /**
       * The client will exchange the token every 30 minutes during active sessions
       * See: `libs\common\src\lib\environment` for `EnvironmentCommonDev.jwtExchangeInterval`
       */
      expiresIn: 3600, // 1 hour (in seconds)
    },
  },
  expiresInRememberMe: 2592000, // 30 days (in seconds)
  cookie: {
    secure: true,
    sameSite: 'strict',
    domain: 'site.com',
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
