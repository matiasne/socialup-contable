import { gql } from "apollo-server-express";

module.exports = gql`
  type User {
    name: String!
    surname: String!
    email: String!
    password: String!
    role: String
    image: String
    address: String
    gender: String
    phone: String
  }

  type Query {
    me: User
  }

  type Token {
    value: String!
  }

  type Mutation {
    createUser(
      name: String!
      surname: String!
      email: String!
      password: String!
      role: String
      image: String
      address: String
      gender: String
      phone: String
    ): User
    login(email: String!, password: String!): Token
  }
`;
