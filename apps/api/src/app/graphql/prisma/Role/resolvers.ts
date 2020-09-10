import { Context } from '../../context'

export default {
  Query: {
    findOneRole: (_parent, args, { prisma }: Context) => {
      return prisma.role.findOne(args)
    },
    findManyRole: (_parent, args, { prisma }: Context) => {
      return prisma.role.findMany(args)
    },
    findManyRoleCount: (_parent, args, { prisma }: Context) => {
      return prisma.role.count(args)
    },
  },
  Mutation: {
    createOneRole: (_parent, args, { prisma }: Context) => {
      return prisma.role.create(args)
    },
    updateOneRole: (_parent, args, { prisma }: Context) => {
      return prisma.role.update(args)
    },
    deleteOneRole: async (_parent, args, { prisma }: Context) => {
      await prisma.onDelete({ model: 'Role', where: args.where })
      return prisma.role.delete(args)
    },
    upsertOneRole: async (_parent, args, { prisma }: Context) => {
      return prisma.role.upsert(args)
    },
    deleteManyRole: async (_parent, args, { prisma }: Context) => {
      await prisma.onDelete({ model: 'Role', where: args.where })
      return prisma.role.deleteMany(args)
    },
    updateManyRole: (_parent, args, { prisma }: Context) => {
      return prisma.role.updateMany(args)
    },
  },
}
