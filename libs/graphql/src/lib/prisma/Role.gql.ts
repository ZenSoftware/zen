import gql from 'graphql-tag';

import { RoleFields } from '../fields';

export const RoleTypeDefs = gql`
  query FindOneRole($where: RoleWhereUniqueInput!) {
    findOneRole(where: $where) {
      ...RoleFields
    }
  }

  query FindManyRole(
    $where: RoleWhereInput
    $orderBy: [RoleOrderByInput!]
    $cursor: RoleWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyRole(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
      ...RoleFields
    }
  }

  query FindManyRoleCount(
    $where: RoleWhereInput
    $orderBy: [RoleOrderByInput!]
    $cursor: RoleWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyRoleCount(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take)
  }

  mutation CreateOneRole($data: RoleCreateInput!) {
    createOneRole(data: $data) {
      ...RoleFields
    }
  }

  mutation UpdateOneRole($where: RoleWhereUniqueInput!, $data: RoleUpdateInput!) {
    updateOneRole(where: $where, data: $data) {
      ...RoleFields
    }
  }

  mutation DeleteOneRole($where: RoleWhereUniqueInput!) {
    deleteOneRole(where: $where) {
      id
    }
  }

  mutation UpsertOneRole(
    $where: RoleWhereUniqueInput!
    $create: RoleCreateInput!
    $update: RoleUpdateInput!
  ) {
    upsertOneRole(where: $where, create: $create, update: $update) {
      ...RoleFields
    }
  }

  mutation DeleteManyRole($where: RoleWhereInput) {
    deleteManyRole(where: $where) {
      count
    }
  }

  mutation UpdateManyRole($where: RoleWhereInput, $data: RoleUpdateManyMutationInput) {
    updateManyRole(where: $where, data: $data) {
      count
    }
  }

  ${RoleFields}
`;
