export function ClientQueriesTemplate(name: string) {
  return `import gql from 'graphql-tag';

import { ${name}Fields } from '../fields';

gql\`
  query FindUnique${name}($where: ${name}WhereUniqueInput!) {
    findUnique${name}(where: $where) {
      ...${name}Fields
    }
  }

  query FindFirst${name}(
    $where: ${name}WhereInput
    $orderBy: [${name}OrderByWithRelationInput]
    $cursor: ${name}WhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [${name}ScalarFieldEnum]
  ) {
    findFirst${name}(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    ) {
      ...${name}Fields
    }
  }

  query FindMany${name}(
    $where: ${name}WhereInput
    $orderBy: [${name}OrderByWithRelationInput]
    $cursor: ${name}WhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [${name}ScalarFieldEnum]
  ) {
    findMany${name}(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    ) {
      ...${name}Fields
    }
  }

  query FindMany${name}Count(
    $where: ${name}WhereInput
    $orderBy: [${name}OrderByWithRelationInput]
    $cursor: ${name}WhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [${name}ScalarFieldEnum]
  ) {
    findMany${name}Count(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    )
  }

  mutation CreateOne${name}($data: ${name}CreateInput!) {
    createOne${name}(data: $data) {
      ...${name}Fields
    }
  }

  mutation UpdateOne${name}($data: ${name}UpdateInput!, $where: ${name}WhereUniqueInput!) {
    updateOne${name}(data: $data, where: $where) {
      ...${name}Fields
    }
  }

  mutation UpdateMany${name}($data: ${name}UpdateManyMutationInput!, $where: ${name}WhereInput!) {
    updateMany${name}(data: $data, where: $where) {
      count
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

  mutation DeleteOne${name}($where: ${name}WhereUniqueInput!) {
    deleteOne${name}(where: $where) {
      id
    }
  }

  mutation DeleteMany${name}($where: ${name}WhereInput!) {
    deleteMany${name}(where: $where) {
      count
    }
  }

  \${${name}Fields}
\`;\n`;
}
