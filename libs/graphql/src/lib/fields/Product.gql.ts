import gql from 'graphql-tag';

export const ProductFields = gql`
  fragment ProductFields on Product {
    id
    # TODO: Add fields
  }
`;
