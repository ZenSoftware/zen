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
      expiresIn: 3600, // 1 hour (in seconds). The client will exchange the token every 30 minutes during active sessions
    },
  },
  rememberMeExpiresIn: 2592000, // 30 days (in seconds)
  cookieDomain: 'site.com',
  smtp: {
    server: process.env.SMTP_SERVER,
    login: process.env.SMTP_LOGIN,
    password: process.env.SMTP_PASSWORD,
    fromName: process.env.SMTP_FROM_NAME,
    fromEmail: process.env.SMTP_FROM_EMAIL,
  },
};
