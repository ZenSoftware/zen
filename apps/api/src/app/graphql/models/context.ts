import { PrismaService } from '../../prisma';

export interface IContext {
  req?: any;
  res?: any;
  prisma?: PrismaService;
}
