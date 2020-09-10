import { PrismaService } from '../prisma';

export interface Context {
  req?: any;
  res?: any;
  prisma?: PrismaService;
}

export function createContext(): Context {
  return {
    prisma: new PrismaService(),
  };
}
