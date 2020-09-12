module.exports = name => {
  return `import gql from 'graphql-tag';

import { ${name}Fields } from '../fields';

export const ${name}TypeDefs = gql\`
  query FindOne${name}($where: ${name}WhereUniqueInput!) {
    findOne${name}(where: $where) {
      ...${name}Fields
    }
  }

  query FindMany${name}(
    $where: ${name}WhereInput
    $orderBy: [${name}OrderByInput!]
    $cursor: ${name}WhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findMany${name}(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
      ...${name}Fields
    }
  }

  query FindMany${name}Count(
    $where: ${name}WhereInput
    $orderBy: [${name}OrderByInput!]
    $cursor: ${name}WhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findMany${name}Count(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take)
  }

  mutation CreateOne${name}($data: ${name}CreateInput!) {
    createOne${name}(data: $data) {
      ...${name}Fields
    }
  }

  mutation UpdateOne${name}($where: ${name}WhereUniqueInput!, $data: ${name}UpdateInput!) {
    updateOne${name}(where: $where, data: $data) {
      ...${name}Fields
    }
  }

  mutation DeleteOne${name}($where: ${name}WhereUniqueInput!) {
    deleteOne${name}(where: $where) {
      id
    }
  }

  mutation UpsertOne${name}(
    $where: ${name}WhereUniqueInput!
    $create: ${name}CreateInput!
    $update: ${name}UpdateInput!
  ) {
    upsertOne${name}(where: $where, create: $create, update: $update) {
      ...${name}Fields
    }
  }

  mutation DeleteMany${name}($where: ${name}WhereInput) {
    deleteMany${name}(where: $where) {
      count
    }
  }

  mutation UpdateMany${name}($where: ${name}WhereInput, $data: ${name}UpdateManyMutationInput) {
    updateMany${name}(where: $where, data: $data) {
      count
    }
  }

  \${${name}Fields}
\`;\n`;
};
