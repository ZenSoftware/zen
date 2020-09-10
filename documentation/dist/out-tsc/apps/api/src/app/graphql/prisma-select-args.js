import { PrismaSelect } from '@paljs/plugins';
export function PrismaSelectArgs(info, args) {
    const result = new PrismaSelect(info).value;
    if (!result.select || Object.keys(result.select).length > 0) {
        return {
            ...args,
            ...result,
        };
    }
    return args;
}
//# sourceMappingURL=prisma-select-args.js.map