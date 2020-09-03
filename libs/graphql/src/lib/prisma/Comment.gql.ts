import gql from 'graphql-tag';

import { CommentFields } from '../fields';

export const CommentTypeDefs = gql`
  query FindOneComment($where: CommentWhereUniqueInput!) {
    findOneComment(where: $where) {
      ...CommentFields
    }
  }

  query FindManyComment(
    $where: CommentWhereInput
    $orderBy: [CommentOrderByInput!]
    $cursor: CommentWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyComment(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
      ...CommentFields
    }
  }

  query FindManyCommentCount(
    $where: CommentWhereInput
    $orderBy: [CommentOrderByInput!]
    $cursor: CommentWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyCommentCount(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take)
  }

  mutation CreateOneComment($data: CommentCreateInput!) {
    createOneComment(data: $data) {
      ...CommentFields
    }
  }

  mutation UpdateOneComment($where: CommentWhereUniqueInput!, $data: CommentUpdateInput!) {
    updateOneComment(where: $where, data: $data) {
      ...CommentFields
    }
  }

  mutation DeleteOneComment($where: CommentWhereUniqueInput!) {
    deleteOneComment(where: $where) {
      id
    }
  }

  mutation UpsertOneComment(
    $where: CommentWhereUniqueInput!
    $create: CommentCreateInput!
    $update: CommentUpdateInput!
  ) {
    upsertOneComment(where: $where, create: $create, update: $update) {
      ...CommentFields
    }
  }

  mutation DeleteManyComment($where: CommentWhereInput) {
    deleteManyComment(where: $where) {
      count
    }
  }

  mutation UpdateManyComment($where: CommentWhereInput, $data: CommentUpdateManyMutationInput) {
    updateManyComment(where: $where, data: $data) {
      count
    }
  }

  ${CommentFields}
`;