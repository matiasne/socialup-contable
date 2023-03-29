import { gql } from "@apollo/client";

const login = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      value
    }
  }
`;

const register = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $password: String!
    $address: String
    $phone: String
    $surname: String!
    $role: String
    $image: String
    $gender: String
  ) {
    createUser(
      name: $name
      email: $email
      password: $password
      address: $address
      phone: $phone
      surname: $surname
      role: $role
      image: $image
      gender: $gender
    ) {
      surname
      phone
      password
      name
      id
      email
      address
      role
      image
      gender
    }
  }
`;

export const UserMutationServices = {
  login,
  register,
};
