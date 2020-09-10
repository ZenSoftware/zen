import { __decorate } from "tslib";
import { Global, Module } from '@nestjs/common';
import { environment } from '../../environments/environment';
import { ConfigService } from './config.service';
let ConfigModule = class ConfigModule {
};
ConfigModule = __decorate([
    Global(),
    Module({
        providers: [{ provide: ConfigService, useValue: environment }],
        exports: [ConfigService],
    })
], ConfigModule);
export { ConfigModule };
//# sourceMappingURL=config.module.js.map