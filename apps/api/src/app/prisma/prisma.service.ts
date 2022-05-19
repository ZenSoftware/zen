import { INestApplication, Injectable, Logger, OnModuleInit, Optional } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(@Optional() options?: Prisma.PrismaClientOptions) {
    super(options);
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (err) {
      Logger.error(err);
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
