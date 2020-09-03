import gql from 'graphql-tag';

import { PostFields } from '../fields';

export const PostTypeDefs = gql`
  query FindOnePost($where: PostWhereUniqueInput!) {
    findOnePost(where: $where) {
      ...PostFields
    }
  }

  query FindManyPost(
    $where: PostWhereInput
    $orderBy: [PostOrderByInput!]
    $cursor: PostWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyPost(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
      ...PostFields
    }
  }

  query FindManyPostCount(
    $where: PostWhereInput
    $orderBy: [PostOrderByInput!]
    $cursor: PostWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyPostCount(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take)
  }

  mutation CreateOnePost($data: PostCreateInput!) {
    createOnePost(data: $data) {
      ...PostFields
    }
  }

  mutation UpdateOnePost($where: PostWhereUniqueInput!, $data: PostUpdateInput!) {
    updateOnePost(where: $where, data: $data) {
      ...PostFields
    }
  }

  mutation DeleteOnePost($where: PostWhereUniqueInput!) {
    deleteOnePost(where: $where) {
      id
    }
  }

  mutation UpsertOnePost(
    $where: PostWhereUniqueInput!
    $create: PostCreateInput!
    $update: PostUpdateInput!
  ) {
    upsertOnePost(where: $where, create: $create, update: $update) {
      ...PostFields
    }
  }

  mutation DeleteManyPost($where: PostWhereInput) {
    deleteManyPost(where: $where) {
      count
    }
  }

  mutation UpdateManyPost($where: PostWhereInput, $data: PostUpdateManyMutationInput) {
    updateManyPost(where: $where, data: $data) {
      count
    }
  }

  ${PostFields}
`;
