import gql from 'graphql-tag';

const MUTATION = gql`
  mutation TestMutation {
    updateOneUser(where: { id: "" }, data: { test: { increment: 1 } }) {
      test
    }
  }
`;
