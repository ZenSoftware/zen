module.exports = Name => {
  return `import gql from 'graphql-tag';

import { ${Name}Fields } from '../fields';

export const ${Name}TypeDefs = gql\`
  query FindOne${Name}($where: ${Name}WhereUniqueInput!) {
    findOne${Name}(where: $where) {
      ...${Name}Fields
    }
  }

  query FindMany${Name}(
    $where: ${Name}WhereInput
    $orderBy: [${Name}OrderByInput!]
    $cursor: ${Name}WhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findMany${Name}(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
      ...${Name}Fields
    }
  }

  query FindMany${Name}Count(
    $where: ${Name}WhereInput
    $orderBy: [${Name}OrderByInput!]
    $cursor: ${Name}WhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findMany${Name}Count(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take)
  }

  mutation CreateOne${Name}($data: ${Name}CreateInput!) {
    createOne${Name}(data: $data) {
      ...${Name}Fields
    }
  }

  mutation UpdateOne${Name}($where: ${Name}WhereUniqueInput!, $data: ${Name}UpdateInput!) {
    updateOne${Name}(where: $where, data: $data) {
      ...${Name}Fields
    }
  }

  mutation DeleteOne${Name}($where: ${Name}WhereUniqueInput!) {
    deleteOne${Name}(where: $where) {
      id
    }
  }

  mutation UpsertOne${Name}(
    $where: ${Name}WhereUniqueInput!
    $create: ${Name}CreateInput!
    $update: ${Name}UpdateInput!
  ) {
    upsertOne${Name}(where: $where, create: $create, update: $update) {
      ...${Name}Fields
    }
  }

  mutation DeleteMany${Name}($where: ${Name}WhereInput) {
    deleteMany${Name}(where: $where) {
      count
    }
  }

  mutation UpdateMany${Name}($where: ${Name}WhereInput, $data: ${Name}UpdateManyMutationInput) {
    updateMany${Name}(where: $where, data: $data) {
      count
    }
  }

  \${${Name}Fields}
\`;`;
};
