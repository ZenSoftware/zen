import { __decorate } from "tslib";
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
let PrismaModule = class PrismaModule {
};
PrismaModule = __decorate([
    Global(),
    Module({
        providers: [PrismaService],
        exports: [PrismaService],
    })
], PrismaModule);
export { PrismaModule };
//# sourceMappingURL=prisma.module.js.map