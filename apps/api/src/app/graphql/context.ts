import { PrismaService } from '../prisma';

const prisma = new PrismaService();

export interface Context {
  req?: any;
  res?: any;
  prisma?: PrismaService;
}

export function createContext(): Context {
  return {
    prisma,
  };
}
