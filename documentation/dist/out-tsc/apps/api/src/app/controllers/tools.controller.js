import { __decorate, __metadata } from "tslib";
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '../config';
let ToolsController = 
// @UseGuards(AuthGuard())
// @Roles('SUPER')
class ToolsController {
    constructor(config) {
        this.config = config;
    }
    async hello() {
        return { message: 'hello' };
    }
};
__decorate([
    Get('hello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ToolsController.prototype, "hello", null);
ToolsController = __decorate([
    Controller('tools')
    // @UseGuards(AuthGuard())
    // @Roles('SUPER')
    ,
    __metadata("design:paramtypes", [ConfigService])
], ToolsController);
export { ToolsController };
//# sourceMappingURL=tools.controller.js.map