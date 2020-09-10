import { __decorate, __metadata } from "tslib";
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config';
import { PrismaService } from '../prisma';
import { ALL_TYPE_DEFS } from './resolvers';
let GqlConfigService = class GqlConfigService {
    constructor(config) {
        this.config = config;
    }
    createGqlOptions() {
        const zenTypeDefs = ALL_TYPE_DEFS;
        console.log(ALL_TYPE_DEFS);
        return {
            typeDefs: ALL_TYPE_DEFS.loc.source.body,
            installSubscriptionHandlers: true,
            debug: !this.config.production,
            playground: this.config.graphql.playground,
            introspection: this.config.graphql.playground,
            tracing: this.config.graphql.playground,
            cors: this.config.production ? undefined : { credentials: true, origin: true },
            context: ctx => {
                return ctx.connection
                    ? { ...ctx, req: ctx.connection.context, prisma: new PrismaService() }
                    : { ...ctx, prisma: new PrismaService() };
            },
            uploads: {
                maxFileSize: 20000000,
                maxFiles: 5,
            },
        };
    }
};
GqlConfigService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], GqlConfigService);
export { GqlConfigService };
//# sourceMappingURL=gql-config.service.js.map