import { gql } from "@apollo/client";

const Login = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const UserMutationServices = {
  Login,
};
