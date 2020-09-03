import gql from 'graphql-tag';

import { GroupFields } from '../fields';

export const GroupTypeDefs = gql`
  query FindOneGroup($where: GroupWhereUniqueInput!) {
    findOneGroup(where: $where) {
      ...GroupFields
    }
  }

  query FindManyGroup(
    $where: GroupWhereInput
    $orderBy: [GroupOrderByInput!]
    $cursor: GroupWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyGroup(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
      ...GroupFields
    }
  }

  query FindManyGroupCount(
    $where: GroupWhereInput
    $orderBy: [GroupOrderByInput!]
    $cursor: GroupWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyGroupCount(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take)
  }

  mutation CreateOneGroup($data: GroupCreateInput!) {
    createOneGroup(data: $data) {
      ...GroupFields
    }
  }

  mutation UpdateOneGroup($where: GroupWhereUniqueInput!, $data: GroupUpdateInput!) {
    updateOneGroup(where: $where, data: $data) {
      ...GroupFields
    }
  }

  mutation DeleteOneGroup($where: GroupWhereUniqueInput!) {
    deleteOneGroup(where: $where) {
      id
    }
  }

  mutation UpsertOneGroup(
    $where: GroupWhereUniqueInput!
    $create: GroupCreateInput!
    $update: GroupUpdateInput!
  ) {
    upsertOneGroup(where: $where, create: $create, update: $update) {
      ...GroupFields
    }
  }

  mutation DeleteManyGroup($where: GroupWhereInput) {
    deleteManyGroup(where: $where) {
      count
    }
  }

  mutation UpdateManyGroup($where: GroupWhereInput, $data: GroupUpdateManyMutationInput) {
    updateManyGroup(where: $where, data: $data) {
      count
    }
  }

  ${GroupFields}
`;