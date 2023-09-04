import { Injectable, Optional } from '@nestjs/common';

import { Prisma, PrismaClient } from './generated';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(@Optional() options?: Prisma.PrismaClientOptions) {
    super(options);
  }
}
