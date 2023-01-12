import gql from 'graphql-tag';

/** Place global GraphQL type definitions here */

export const typeDefs = gql`
  scalar Upload # for graphql-upload-minimal
  scalar Json # for Prisma Json type
`;
