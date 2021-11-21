import gql from 'graphql-tag';

import { UserFields } from '../fields';

export const UserTypeDefs = gql`
  query FindUniqueUser($where: UserWhereUniqueInput!) {
    findUniqueUser(where: $where) {
      ...UserFields
    }
  }

  query FindFirstUser(
    $where: UserWhereInput
    $orderBy: [UserOrderByWithRelationInput!]
    $cursor: UserWhereUniqueInput
    $distinct: [UserScalarFieldEnum]
    $take: Int
    $skip: Int
  ) {
    findManyUser(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      distinct: $distinct
      take: $take
      skip: $skip
    ) {
      ...UserFields
    }
  }

  query FindManyUser(
    $where: UserWhereInput
    $orderBy: [UserOrderByWithRelationInput!]
    $cursor: UserWhereUniqueInput
    $distinct: [UserScalarFieldEnum]
    $take: Int
    $skip: Int
  ) {
    findManyUser(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      distinct: $distinct
      take: $take
      skip: $skip
    ) {
      ...UserFields
    }
  }

  query FindManyUserCount(
    $where: UserWhereInput
    $orderBy: [UserOrderByWithRelationInput!]
    $cursor: UserWhereUniqueInput
    $distinct: [UserScalarFieldEnum]
    $take: Int
    $skip: Int
  ) {
    findManyUserCount(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      distinct: $distinct
      take: $take
      skip: $skip
    )
  }

  mutation CreateOneUser($data: UserCreateInput!) {
    createOneUser(data: $data) {
      ...UserFields
    }
  }

  mutation UpdateOneUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateOneUser(where: $where, data: $data) {
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

  mutation DeleteManyUser($where: UserWhereInput) {
    deleteManyUser(where: $where) {
      count
    }
  }

  mutation UpdateManyUser($where: UserWhereInput, $data: UserUpdateManyMutationInput!) {
    updateManyUser(where: $where, data: $data) {
      count
    }
  }

  ${UserFields}
`;
