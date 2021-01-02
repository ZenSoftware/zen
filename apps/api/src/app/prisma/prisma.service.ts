import { Injectable, OnModuleDestroy, OnModuleInit, Optional, Scope } from '@nestjs/common';
import { PrismaDelete, onDeleteArgs } from '@paljs/plugins';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(@Optional() options?: Prisma.PrismaClientOptions) {
    super(options);
  }

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this);
    await prismaDelete.onDelete(args);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
