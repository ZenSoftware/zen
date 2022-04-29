import { Controller, Get, Header, Logger, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { HttpGuard, Roles } from '../auth';
import { PrismaService } from '../prisma';

@Controller('tools')
@UseGuards(HttpGuard)
@Roles('Super')
export class ToolsController {
  constructor(private readonly prisma: PrismaService) {}

  // @Get('meta')
  // @Header('Content-Type', 'text/plain')
  // async meta() {
  //   let result = '';

  //   Prisma.dmmf.datamodel.models.forEach(model => {
  //     result += '\n' + model.name + '\n';
  //     model.fields.forEach(field => {
  //       result += `  ${field.name} ${field.type}\n`;
  //     });
  //   });

  //   Logger.log(result);
  //   return result;
  // }
}
