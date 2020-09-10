import { PrismaService } from '../prisma';
import { GqlContext } from './models';
export { GqlContext } from './models';

export type Context = GqlContext;

export function createContext(): Context {
  return {
    prisma: new PrismaService(),
  };
}
