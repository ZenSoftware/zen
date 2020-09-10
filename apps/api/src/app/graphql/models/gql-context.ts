import { PrismaService } from '../../prisma';

export interface GqlContext {
  req?: any;
  res?: any;
  prisma?: PrismaService;
}
