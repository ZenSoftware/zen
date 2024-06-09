/** This file is code generated */
import gql from 'graphql-tag';

export default gql`
  extend type Mutation {
    createManyUser(data: [UserCreateManyInput!]!): BatchPayload
    createManyUserAndReturn(data: [UserCreateManyInput!]!): [User!]!
  }
`;
