import { gql } from "@apollo/client";

const AccountUsers = gql`
  query Query {
    personCount
  }
`;

export const UserQueryServices = {
  AccountUsers,
};
