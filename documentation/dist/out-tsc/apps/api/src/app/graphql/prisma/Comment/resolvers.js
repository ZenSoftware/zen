export default {
    Query: {
        findOneComment: (_parent, args, { prisma }) => {
            return prisma.comment.findOne(args);
        },
        findManyComment: (_parent, args, { prisma }) => {
            return prisma.comment.findMany(args);
        },
        findManyCommentCount: (_parent, args, { prisma }) => {
            return prisma.comment.count(args);
        },
    },
    Mutation: {
        createOneComment: (_parent, args, { prisma }) => {
            return prisma.comment.create(args);
        },
        updateOneComment: (_parent, args, { prisma }) => {
            return prisma.comment.update(args);
        },
        deleteOneComment: async (_parent, args, { prisma }) => {
            await prisma.onDelete({ model: 'Comment', where: args.where });
            return prisma.comment.delete(args);
        },
        upsertOneComment: async (_parent, args, { prisma }) => {
            return prisma.comment.upsert(args);
        },
        deleteManyComment: async (_parent, args, { prisma }) => {
            await prisma.onDelete({ model: 'Comment', where: args.where });
            return prisma.comment.deleteMany(args);
        },
        updateManyComment: (_parent, args, { prisma }) => {
            return prisma.comment.updateMany(args);
        },
    },
};
//# sourceMappingURL=resolvers.js.map