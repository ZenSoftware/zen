import gql from 'graphql-tag';

import { UserFields } from '../fields';

export default gql`
  query FindUniqueUser($where: UserWhereUniqueInput!) {
    findUniqueUser(where: $where) {
      ...UserFields
    }
  }

  query FindFirstUser(
    $where: UserWhereInput
    $orderBy: [UserOrderByWithRelationInput]
    $cursor: UserWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [UserScalarFieldEnum]
  ) {
    findFirstUser(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    ) {
      ...UserFields
    }
  }

  query FindManyUser(
    $where: UserWhereInput
    $orderBy: [UserOrderByWithRelationInput]
    $cursor: UserWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [UserScalarFieldEnum]
  ) {
    findManyUser(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    ) {
      ...UserFields
    }
  }

  query FindManyUserCount(
    $where: UserWhereInput
    $orderBy: [UserOrderByWithRelationInput]
    $cursor: UserWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [UserScalarFieldEnum]
  ) {
    findManyUserCount(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    )
  }

  mutation CreateOneUser($data: UserCreateInput!) {
    createOneUser(data: $data) {
      ...UserFields
    }
  }

  mutation CreateManyUser($data: [UserCreateManyInput!]!) {
    createManyUser(data: $data) {
      count
    }
  }

  mutation CreateManyUserAndReturn($data: [UserCreateManyInput!]!) {
    createManyUserAndReturn(data: $data) {
      ...UserFields
    }
  }

  mutation UpdateOneUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateOneUser(data: $data, where: $where) {
      ...UserFields
    }
  }

  mutation DeleteOneUser($where: UserWhereUniqueInput!) {
    deleteOneUser(where: $where) {
      id
    }
  }

  mutation UpsertOneUser(
    $where: UserWhereUniqueInput!
    $create: UserCreateInput!
    $update: UserUpdateInput!
  ) {
    upsertOneUser(where: $where, create: $create, update: $update) {
      ...UserFields
    }
  }

  mutation DeleteManyUser($where: UserWhereInput!) {
    deleteManyUser(where: $where) {
      count
    }
  }

  mutation UpdateManyUser($data: UserUpdateManyMutationInput!, $where: UserWhereInput!) {
    updateManyUser(data: $data, where: $where) {
      count
    }
  }

  ${UserFields}
`;
