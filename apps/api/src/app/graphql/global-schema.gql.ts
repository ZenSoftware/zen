/**
 * @description Global GraphQL SDL
 * For subgraph schema additions refer to https://www.apollographql.com/docs/federation/federation-spec/
 */
import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar Upload # for graphql-upload
  scalar Json # for Prisma Json type
  scalar link__Import
  enum link__Purpose {
    """
    SECURITY features provide metadata necessary to securely resolve fields.
    """
    SECURITY

    """
    EXECUTION features provide metadata necessary for operation execution.
    """
    EXECUTION
  }

  directive @link(
    url: String!
    as: String
    for: link__Purpose
    import: [link__Import]
  ) repeatable on SCHEMA

  directive @key(fields: String!, resolvable: Boolean = true) repeatable on OBJECT | INTERFACE
  directive @shareable on FIELD_DEFINITION | OBJECT

  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])
`;
