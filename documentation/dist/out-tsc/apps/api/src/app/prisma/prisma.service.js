import { __decorate, __metadata, __param } from "tslib";
import { Injectable, Optional, Scope } from '@nestjs/common';
import { PrismaDelete } from '@paljs/plugins';
import { PrismaClient } from '@prisma/client';
let PrismaService = class PrismaService extends PrismaClient {
    constructor(options) {
        super(options);
    }
    async onDelete(args) {
        const prismaDelete = new PrismaDelete(this);
        await prismaDelete.onDelete(args);
    }
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
PrismaService = __decorate([
    Injectable({ scope: Scope.REQUEST }),
    __param(0, Optional()),
    __metadata("design:paramtypes", [Object])
], PrismaService);
export { PrismaService };
//# sourceMappingURL=prisma.service.js.map