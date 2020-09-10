export default {
    Query: {
        findOneUser: (_parent, args, { prisma }) => {
            return prisma.user.findOne(args);
        },
        findManyUser: (_parent, args, { prisma }) => {
            return prisma.user.findMany(args);
        },
        findManyUserCount: (_parent, args, { prisma }) => {
            return prisma.user.count(args);
        },
    },
    Mutation: {
        createOneUser: (_parent, args, { prisma }) => {
            return prisma.user.create(args);
        },
        updateOneUser: (_parent, args, { prisma }) => {
            return prisma.user.update(args);
        },
        deleteOneUser: async (_parent, args, { prisma }) => {
            await prisma.onDelete({ model: 'User', where: args.where });
            return prisma.user.delete(args);
        },
        upsertOneUser: async (_parent, args, { prisma }) => {
            return prisma.user.upsert(args);
        },
        deleteManyUser: async (_parent, args, { prisma }) => {
            await prisma.onDelete({ model: 'User', where: args.where });
            return prisma.user.deleteMany(args);
        },
        updateManyUser: (_parent, args, { prisma }) => {
            return prisma.user.updateMany(args);
        },
    },
};
//# sourceMappingURL=resolvers.js.map