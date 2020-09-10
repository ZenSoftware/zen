import gql from 'graphql-tag';
export default gql `
  type Group {
    id: Int!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    users(
      where: UserWhereInput
      orderBy: UserOrderByInput
      cursor: UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: UserDistinctFieldEnum
    ): [User!]!
  }

  type Query {
    findOneGroup(where: GroupWhereUniqueInput!): Group
    findManyGroup(
      where: GroupWhereInput
      orderBy: [GroupOrderByInput!]
      cursor: GroupWhereUniqueInput
      skip: Int
      take: Int
    ): [Group!]
    findManyGroupCount(
      where: GroupWhereInput
      orderBy: [GroupOrderByInput!]
      cursor: GroupWhereUniqueInput
      skip: Int
      take: Int
    ): Int!
  }
  type Mutation {
    createOneGroup(data: GroupCreateInput!): Group!
    updateOneGroup(
      where: GroupWhereUniqueInput!
      data: GroupUpdateInput!
    ): Group!
    deleteOneGroup(where: GroupWhereUniqueInput!): Group
    upsertOneGroup(
      where: GroupWhereUniqueInput!
      create: GroupCreateInput!
      update: GroupUpdateInput!
    ): Group
    deleteManyGroup(where: GroupWhereInput): BatchPayload
    updateManyGroup(
      where: GroupWhereInput
      data: GroupUpdateManyMutationInput
    ): BatchPayload
  }
`;
//# sourceMappingURL=typeDefs.js.map