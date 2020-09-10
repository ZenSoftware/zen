import gql from 'graphql-tag';

export const RoleFields = gql`
  fragment RoleFields on Role {
    id
  }
`;
