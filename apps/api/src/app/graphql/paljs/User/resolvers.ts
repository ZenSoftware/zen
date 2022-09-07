import { Resolvers } from '../../resolversTypes';

const resolvers: Resolvers = {
  Query: {
    findUniqueUser: (_parent, args, { prisma }) => {
      return prisma.user.findUnique(args);
    },
    findFirstUser: (_parent, args, { prisma }) => {
      return prisma.user.findFirst(args);
    },
    findManyUser: (_parent, args, { prisma }) => {
      return prisma.user.findMany(args);
    },
    findManyUserCount: (_parent, args, { prisma }) => {
      return prisma.user.count(args);
    },
    aggregateUser: (_parent, args, { prisma }) => {
      return prisma.user.aggregate(args);
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
      return prisma.user.delete(args);
    },
    upsertOneUser: async (_parent, args, { prisma }) => {
      return prisma.user.upsert(args);
    },
    deleteManyUser: async (_parent, args, { prisma }) => {
      return prisma.user.deleteMany(args);
    },
    updateManyUser: (_parent, args, { prisma }) => {
      return prisma.user.updateMany(args);
    },
  },
};
export default resolvers;
