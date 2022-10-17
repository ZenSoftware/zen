import gql from 'graphql-tag';

export default gql`
  type User @key(fields: "id") @key(fields: "email") @shareable {
    id: Int!
    createdAt: DateTime!
    username: String
    password: String
    email: String!
    roles: [String!]!
    googleId: String
    googleProfile: Json
  }

  type Query {
    Product_findUniqueUser(where: Product_UserWhereUniqueInput!): User
    Product_findFirstUser(
      where: Product_UserWhereInput
      orderBy: [Product_UserOrderByWithRelationInput]
      cursor: Product_UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: [UserScalarFieldEnum]
    ): User
    Product_findManyUser(
      where: Product_UserWhereInput
      orderBy: [Product_UserOrderByWithRelationInput]
      cursor: Product_UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: [UserScalarFieldEnum]
    ): [User!]
    Product_findManyUserCount(
      where: Product_UserWhereInput
      orderBy: [Product_UserOrderByWithRelationInput]
      cursor: Product_UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: [UserScalarFieldEnum]
    ): Int!
    Product_aggregateUser(
      where: Product_UserWhereInput
      orderBy: [Product_UserOrderByWithRelationInput]
      cursor: Product_UserWhereUniqueInput
      take: Int
      skip: Int
    ): AggregateUser
  }

  type Mutation {
    Product_createOneUser(data: Product_UserCreateInput!): User!
    Product_updateOneUser(
      data: Product_UserUpdateInput!
      where: Product_UserWhereUniqueInput!
    ): User!
    Product_deleteOneUser(where: Product_UserWhereUniqueInput!): User
    Product_upsertOneUser(
      where: Product_UserWhereUniqueInput!
      create: Product_UserCreateInput!
      update: Product_UserUpdateInput!
    ): User
    Product_deleteManyUser(where: Product_UserWhereInput): BatchPayload
    Product_updateManyUser(
      data: Product_UserUpdateManyMutationInput!
      where: Product_UserWhereInput
    ): BatchPayload
  }
`;
