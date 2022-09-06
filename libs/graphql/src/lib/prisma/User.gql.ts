import gql from 'graphql-tag';

import { UserFields } from '../fields';

gql`
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

  mutation UpdateOneUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateOneUser(data: $data, where: $where) {
      ...UserFields
    }
  }

  mutation UpdateManyUser($data: UserUpdateManyMutationInput!, $where: UserWhereInput!) {
    updateManyUser(data: $data, where: $where) {
      count
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

  mutation DeleteOneUser($where: UserWhereUniqueInput!) {
    deleteOneUser(where: $where) {
      id
    }
  }

  mutation DeleteManyUser($where: UserWhereInput!) {
    deleteManyUser(where: $where) {
      count
    }
  }

  ${UserFields}
`;
