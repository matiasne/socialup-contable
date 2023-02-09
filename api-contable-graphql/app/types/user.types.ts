import { gql } from "apollo-server-express";

module.exports = gql`
  type User {
    username: String!
    password: String!
    id: ID!
  }

  type Query {
    me: User
  }

  type Token {
    value: String!
  }

  type Mutation {
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): Token
  }
`;
