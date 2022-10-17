import { Resolvers } from '../../resolversTypes';

const resolvers: Resolvers = {
  Query: {
    Product_findUniqueUser: (_parent, args, { prisma }) => {
      return prisma.user.findUnique(args);
    },
    Product_findFirstUser: (_parent, args, { prisma }) => {
      return prisma.user.findFirst(args);
    },
    Product_findManyUser: (_parent, args, { prisma }) => {
      return prisma.user.findMany(args);
    },
    Product_findManyUserCount: (_parent, args, { prisma }) => {
      return prisma.user.count(args);
    },
    Product_aggregateUser: (_parent, args, { prisma }) => {
      return prisma.user.aggregate(args);
    },
  },
  Mutation: {
    Product_createOneUser: (_parent, args, { prisma }) => {
      return prisma.user.create(args);
    },
    Product_updateOneUser: (_parent, args, { prisma }) => {
      return prisma.user.update(args);
    },
    Product_deleteOneUser: async (_parent, args, { prisma }) => {
      return prisma.user.delete(args);
    },
    Product_upsertOneUser: async (_parent, args, { prisma }) => {
      return prisma.user.upsert(args);
    },
    Product_deleteManyUser: async (_parent, args, { prisma }) => {
      return prisma.user.deleteMany(args);
    },
    Product_updateManyUser: (_parent, args, { prisma }) => {
      return prisma.user.updateMany(args);
    },
  },
  User: {
    __resolveReference(reference, { prisma }) {
      const [field, value] = Object.entries(reference).find(e => e[0] !== '__typename');
      return prisma.user.findUnique({ where: { [field]: value } });
    },
  },
};
export default resolvers;
