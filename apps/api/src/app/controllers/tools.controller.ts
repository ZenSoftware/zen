import { Controller, Delete, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ConfigService } from '../config';

@Controller('tools')
// @UseGuards(AuthGuard())
// @Roles('SUPER')
export class ToolsController {
  constructor(private readonly config: ConfigService) {}
  @Get('is-production')
  async isProduction() {
    return this.config.production;
  }
}
