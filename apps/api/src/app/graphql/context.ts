import { PrismaService } from '../prisma';

const prisma = new PrismaService();

export interface Context {
  prisma: PrismaService;
}

export function createContext(): Context {
  return {
    prisma,
  };
}
