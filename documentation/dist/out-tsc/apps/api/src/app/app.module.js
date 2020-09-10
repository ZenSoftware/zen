import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { ConfigModule } from './config';
import { ZenGraphQLModule } from './graphql';
import { JwtModule } from './jwt';
import { PrismaModule } from './prisma';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [ConfigModule, JwtModule, ZenGraphQLModule, PrismaModule],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map