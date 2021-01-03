import { Request, Response } from 'express';

import { PrismaService } from '../../prisma';

export interface IContext {
  req?: Request;
  res?: Response;
  prisma?: PrismaService;
  token?: string; // For authorizing websoket contexts
}
