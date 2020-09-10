import { PrismaService } from '../prisma';
import { IContext } from './models';

export type Context = IContext;

export function createContext(): Context {
  return {
    prisma: new PrismaService(),
  };
}
