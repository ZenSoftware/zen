import gql from 'graphql-tag'

export default gql`
  type Role {
    id: String!
    name: String!
  }

  type Query {
    findOneRole(where: RoleWhereUniqueInput!): Role
    findManyRole(
      where: RoleWhereInput
      orderBy: [RoleOrderByInput!]
      cursor: RoleWhereUniqueInput
      skip: Int
      take: Int
    ): [Role!]
    findManyRoleCount(
      where: RoleWhereInput
      orderBy: [RoleOrderByInput!]
      cursor: RoleWhereUniqueInput
      skip: Int
      take: Int
    ): Int!
  }
  type Mutation {
    createOneRole(data: RoleCreateInput!): Role!
    updateOneRole(where: RoleWhereUniqueInput!, data: RoleUpdateInput!): Role!
    deleteOneRole(where: RoleWhereUniqueInput!): Role
    upsertOneRole(
      where: RoleWhereUniqueInput!
      create: RoleCreateInput!
      update: RoleUpdateInput!
    ): Role
    deleteManyRole(where: RoleWhereInput): BatchPayload
    updateManyRole(
      where: RoleWhereInput
      data: RoleUpdateManyMutationInput
    ): BatchPayload
  }
`
