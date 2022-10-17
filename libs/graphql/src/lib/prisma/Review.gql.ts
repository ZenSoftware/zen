import gql from 'graphql-tag';

import { ReviewFields } from '../fields';

export default gql`
  query FindUniqueReview($where: ReviewWhereUniqueInput!) {
    findUniqueReview(where: $where) {
      ...ReviewFields
    }
  }

  query FindFirstReview(
    $where: ReviewWhereInput
    $orderBy: [ReviewOrderByWithRelationInput]
    $cursor: ReviewWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [ReviewScalarFieldEnum]
  ) {
    findFirstReview(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    ) {
      ...ReviewFields
    }
  }

  query FindManyReview(
    $where: ReviewWhereInput
    $orderBy: [ReviewOrderByWithRelationInput]
    $cursor: ReviewWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [ReviewScalarFieldEnum]
  ) {
    findManyReview(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    ) {
      ...ReviewFields
    }
  }

  query FindManyReviewCount(
    $where: ReviewWhereInput
    $orderBy: [ReviewOrderByWithRelationInput]
    $cursor: ReviewWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [ReviewScalarFieldEnum]
  ) {
    findManyReviewCount(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    )
  }

  mutation CreateOneReview($data: ReviewCreateInput!) {
    createOneReview(data: $data) {
      ...ReviewFields
    }
  }

  mutation UpdateOneReview($data: ReviewUpdateInput!, $where: ReviewWhereUniqueInput!) {
    updateOneReview(data: $data, where: $where) {
      ...ReviewFields
    }
  }

  mutation UpdateManyReview($data: ReviewUpdateManyMutationInput!, $where: ReviewWhereInput!) {
    updateManyReview(data: $data, where: $where) {
      count
    }
  }

  mutation UpsertOneReview(
    $where: ReviewWhereUniqueInput!
    $create: ReviewCreateInput!
    $update: ReviewUpdateInput!
  ) {
    upsertOneReview(where: $where, create: $create, update: $update) {
      ...ReviewFields
    }
  }

  mutation DeleteOneReview($where: ReviewWhereUniqueInput!) {
    deleteOneReview(where: $where) {
      id
    }
  }

  mutation DeleteManyReview($where: ReviewWhereInput!) {
    deleteManyReview(where: $where) {
      count
    }
  }

  ${ReviewFields}
`;
