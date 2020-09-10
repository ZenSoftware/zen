import { __decorate } from "tslib";
import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlConfigService } from './gql-config.service';
import { NEST_RESOLVERS } from './resolvers';
let ZenGraphQLModule = class ZenGraphQLModule {
};
ZenGraphQLModule = __decorate([
    Global(),
    Module({
        imports: [
            GraphQLModule.forRootAsync({
                useClass: GqlConfigService,
            }),
        ],
        providers: [...NEST_RESOLVERS],
    })
], ZenGraphQLModule);
export { ZenGraphQLModule };
//# sourceMappingURL=zen-graphql.module.js.map