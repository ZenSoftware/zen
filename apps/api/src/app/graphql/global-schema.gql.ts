import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar Upload # for graphql-upload
  scalar Json # for Prisma Json type
`;
