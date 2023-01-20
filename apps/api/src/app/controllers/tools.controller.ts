import { Controller, Get, Header, Logger, UseGuards } from '@nestjs/common';
import { RolesGuard } from '@zen/nest-auth';

import { Prisma } from '../prisma';
import { PrismaService } from '../prisma';

@Controller()
@UseGuards(RolesGuard('Super'))
export class ToolsController {
  constructor(private readonly prisma: PrismaService) {}

  // @Get('metrics')
  // @Header('Content-Type', 'text/plain')
  // async metrics() {
  //   return this.prisma.$metrics.prometheus();
  // }

  // @Get('meta')
  // @Header('Content-Type', 'text/plain')
  // async meta() {
  //   let result = '';

  //   Prisma.dmmf.datamodel.models.forEach(model => {
  //     result += '\n' + model.name + '\n';
  //     model.fields.forEach(field => {
  //       result += `  ${field.name}: ${field.type}${field.isList ? '[]' : ''}\n`;
  //     });
  //   });

  //   Logger.log(result);
  //   return result;
  // }
}
