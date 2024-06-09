export function ClientQueriesTemplate(name: string, fieldsFolderName: string) {
  return `import gql from 'graphql-tag';

import { ${name}Fields } from '../fields';

export default gql\`
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

  mutation CreateMany${name}($data: [${name}CreateManyInput!]!) {
    createMany${name}(data: $data) {
      count
    }
  }

  mutation CreateMany${name}AndReturn($data: [${name}CreateManyInput!]!) {
    createMany${name}AndReturn(data: $data) {
      ...${name}Fields
    }
  }

  mutation UpdateOne${name}($data: ${name}UpdateInput!, $where: ${name}WhereUniqueInput!) {
    updateOne${name}(data: $data, where: $where) {
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

  mutation DeleteMany${name}($where: ${name}WhereInput!) {
    deleteMany${name}(where: $where) {
      count
    }
  }

  mutation UpdateMany${name}($data: ${name}UpdateManyMutationInput!, $where: ${name}WhereInput!) {
    updateMany${name}(data: $data, where: $where) {
      count
    }
  }

  \${${name}Fields}
\`;
`;
}
