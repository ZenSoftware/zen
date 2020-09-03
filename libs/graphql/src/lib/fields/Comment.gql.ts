import gql from 'graphql-tag';

export const CommentFields = gql`
  fragment CommentFields on Comment {
    id
  }
`;