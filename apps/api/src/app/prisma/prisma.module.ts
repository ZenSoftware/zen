import { Module } from '@nestjs/common';

import { PrismaSelectService } from './prisma-select.service';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, PrismaSelectService],
  exports: [PrismaService, PrismaSelectService],
})
export class PrismaModule {}
