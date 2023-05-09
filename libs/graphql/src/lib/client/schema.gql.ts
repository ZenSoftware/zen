import gql from 'graphql-tag';

export default gql`
  extend type Query {
    sample: Boolean!
  }

  query Sample {
    sample @client
  }
`;
