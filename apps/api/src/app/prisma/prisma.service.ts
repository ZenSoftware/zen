import { Injectable, OnModuleDestroy, OnModuleInit, Optional, Scope } from '@nestjs/common';
import { PrismaDelete, onDeleteArgs } from '@paljs/plugins';
import { PrismaClient, PrismaClientOptions } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(@Optional() options?: PrismaClientOptions) {
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
