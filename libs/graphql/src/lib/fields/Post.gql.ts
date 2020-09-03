import gql from 'graphql-tag';

export const PostFields = gql`
  fragment PostFields on Post {
    id
  }
`;
