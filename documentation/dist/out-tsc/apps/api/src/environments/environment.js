import * as dotenv from 'dotenv';
dotenv.config();
export const environment = {
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
            expiresIn: 3600,
        },
    },
    rememberMeExpiresIn: 2592000,
    cookieDomain: undefined,
};
//# sourceMappingURL=environment.js.map