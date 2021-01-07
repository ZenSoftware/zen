import { Controller, Delete, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';

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

  // @Post('test')
  // async test() {
  //   Prisma.dmmf.datamodel.models.forEach(model => {
  //     console.log(model.name);
  //     model.fields.forEach(field => {
  //       console.log(`  ${field.name} - ${field.kind}`);
  //     });
  //   });

  //   return { message: 'done' };
  // }
}
