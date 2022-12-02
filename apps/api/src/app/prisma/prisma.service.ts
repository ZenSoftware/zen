import { INestApplication, Injectable, Optional } from '@nestjs/common';

import { Prisma, PrismaClient } from './client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(@Optional() options?: Prisma.PrismaClientOptions) {
    super(options);
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
