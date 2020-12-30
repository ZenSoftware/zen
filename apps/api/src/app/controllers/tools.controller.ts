import { Controller, Delete, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from '../auth';
import { PrismaService } from '../prisma';

@Controller('tools')
@UseGuards(AuthGuard())
@Roles('Super')
export class ToolsController {
  constructor(private readonly prisma: PrismaService) {}

  // @Post('migrate')
  // async migrate() {
  //   return { message: `migration done` };
  // }
}
