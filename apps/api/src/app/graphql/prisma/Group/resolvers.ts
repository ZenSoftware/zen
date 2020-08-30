import { Context } from '../../context'

export default {
  Query: {
    findOneGroup: (_parent, args, { prisma }: Context) => {
      return prisma.group.findOne(args)
    },
    findManyGroup: (_parent, args, { prisma }: Context) => {
      return prisma.group.findMany(args)
    },
    findManyGroupCount: (_parent, args, { prisma }: Context) => {
      return prisma.group.count(args)
    },
  },
  Mutation: {
    createOneGroup: (_parent, args, { prisma }: Context) => {
      return prisma.group.create(args)
    },
    updateOneGroup: (_parent, args, { prisma }: Context) => {
      return prisma.group.update(args)
    },
    deleteOneGroup: async (_parent, args, { prisma }: Context) => {
      await prisma.onDelete({ model: 'Group', where: args.where })
      return prisma.group.delete(args)
    },
    upsertOneGroup: async (_parent, args, { prisma }: Context) => {
      return prisma.group.upsert(args)
    },
    deleteManyGroup: async (_parent, args, { prisma }: Context) => {
      await prisma.onDelete({ model: 'Group', where: args.where })
      return prisma.group.deleteMany(args)
    },
    updateManyGroup: (_parent, args, { prisma }: Context) => {
      return prisma.group.updateMany(args)
    },
  },
}
