import gql from 'graphql-tag';
export default gql `
  type User {
    id: Int!
    createdAt: DateTime!
    email: String!
    name: String
    password: String!
    posts(
      where: PostWhereInput
      orderBy: PostOrderByInput
      cursor: PostWhereUniqueInput
      take: Int
      skip: Int
      distinct: PostDistinctFieldEnum
    ): [Post!]!
    group: Group
    groupId: Int
    comments(
      where: CommentWhereInput
      orderBy: CommentOrderByInput
      cursor: CommentWhereUniqueInput
      take: Int
      skip: Int
      distinct: CommentDistinctFieldEnum
    ): [Comment!]!
  }

  type Query {
    findOneUser(where: UserWhereUniqueInput!): User
    findManyUser(
      where: UserWhereInput
      orderBy: [UserOrderByInput!]
      cursor: UserWhereUniqueInput
      skip: Int
      take: Int
    ): [User!]
    findManyUserCount(
      where: UserWhereInput
      orderBy: [UserOrderByInput!]
      cursor: UserWhereUniqueInput
      skip: Int
      take: Int
    ): Int!
  }
  type Mutation {
    createOneUser(data: UserCreateInput!): User!
    updateOneUser(where: UserWhereUniqueInput!, data: UserUpdateInput!): User!
    deleteOneUser(where: UserWhereUniqueInput!): User
    upsertOneUser(
      where: UserWhereUniqueInput!
      create: UserCreateInput!
      update: UserUpdateInput!
    ): User
    deleteManyUser(where: UserWhereInput): BatchPayload
    updateManyUser(
      where: UserWhereInput
      data: UserUpdateManyMutationInput
    ): BatchPayload
  }
`;
//# sourceMappingURL=typeDefs.js.map