import { EnvironmentBase } from './environment.base';

export const environment: EnvironmentBase = {
  production: true,
  expressPort: process.env.PORT,
  graphql: {
    playground: false,
  },
  postgres: {
    host: 'postgres-svc',
    port: 5432,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: 'prisma',
  },
  jwtOptions: {
    privateKey: process.env.JWT_PRIVATE_KEY,
    publicKey: process.env.JWT_PUBLIC_KEY,
    signOptions: {
      algorithm: 'RS256',
      expiresIn: 3600, // 1 hour (in seconds)
    },
  },
  rememberMeExpiresIn: 2592000, // 30 days (in seconds)
  cookieDomain: 'zensoftware.ca',
};
