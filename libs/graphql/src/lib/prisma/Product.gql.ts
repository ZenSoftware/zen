import gql from 'graphql-tag';

import { ProductFields } from '../fields';

export default gql`
  query FindUniqueProduct($where: ProductWhereUniqueInput!) {
    findUniqueProduct(where: $where) {
      ...ProductFields
    }
  }

  query FindFirstProduct(
    $where: ProductWhereInput
    $orderBy: [ProductOrderByWithRelationInput]
    $cursor: ProductWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [ProductScalarFieldEnum]
  ) {
    findFirstProduct(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    ) {
      ...ProductFields
    }
  }

  query FindManyProduct(
    $where: ProductWhereInput
    $orderBy: [ProductOrderByWithRelationInput]
    $cursor: ProductWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [ProductScalarFieldEnum]
  ) {
    findManyProduct(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    ) {
      ...ProductFields
    }
  }

  query FindManyProductCount(
    $where: ProductWhereInput
    $orderBy: [ProductOrderByWithRelationInput]
    $cursor: ProductWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [ProductScalarFieldEnum]
  ) {
    findManyProductCount(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    )
  }

  mutation CreateOneProduct($data: ProductCreateInput!) {
    createOneProduct(data: $data) {
      ...ProductFields
    }
  }

  mutation UpdateOneProduct($data: ProductUpdateInput!, $where: ProductWhereUniqueInput!) {
    updateOneProduct(data: $data, where: $where) {
      ...ProductFields
    }
  }

  mutation UpdateManyProduct($data: ProductUpdateManyMutationInput!, $where: ProductWhereInput!) {
    updateManyProduct(data: $data, where: $where) {
      count
    }
  }

  mutation UpsertOneProduct(
    $where: ProductWhereUniqueInput!
    $create: ProductCreateInput!
    $update: ProductUpdateInput!
  ) {
    upsertOneProduct(where: $where, create: $create, update: $update) {
      ...ProductFields
    }
  }

  mutation DeleteOneProduct($where: ProductWhereUniqueInput!) {
    deleteOneProduct(where: $where) {
      id
    }
  }

  mutation DeleteManyProduct($where: ProductWhereInput!) {
    deleteManyProduct(where: $where) {
      count
    }
  }

  ${ProductFields}
`;
