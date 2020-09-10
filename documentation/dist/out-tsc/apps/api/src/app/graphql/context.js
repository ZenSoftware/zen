import { PrismaService } from '../prisma';
const prisma = new PrismaService();
export function createContext() {
    return {
        prisma,
    };
}
//# sourceMappingURL=context.js.map