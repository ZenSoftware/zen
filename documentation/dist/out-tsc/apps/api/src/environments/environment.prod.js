export const environment = {
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
            expiresIn: 3600,
        },
    },
    rememberMeExpiresIn: 2592000,
    cookieDomain: 'zensoftware.ca',
};
//# sourceMappingURL=environment.prod.js.map