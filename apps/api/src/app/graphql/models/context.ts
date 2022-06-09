import { Request, Response } from 'express';

import { PrismaService } from '../../prisma';

export class IContext {
  req?: Request;
  res?: Response;
  prisma?: PrismaService;
}
