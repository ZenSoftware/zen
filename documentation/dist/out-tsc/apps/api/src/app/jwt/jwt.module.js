import { __decorate } from "tslib";
import { Global, Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { environment } from '../../environments/environment';
let JwtModule = class JwtModule {
};
JwtModule = __decorate([
    Global(),
    Module({
        imports: [NestJwtModule.register(environment.jwtOptions)],
        exports: [NestJwtModule],
    })
], JwtModule);
export { JwtModule };
//# sourceMappingURL=jwt.module.js.map