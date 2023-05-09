import gql from 'graphql-tag';

/**
 * Define Apollo client-side schema here
 * [Apollo docs](https://www.apollographql.com/docs/react/local-state/client-side-schema)
 */
export default gql`
  extend type Query {
    sample: Boolean!
  }

  query Sample {
    sample @client
  }
`;
