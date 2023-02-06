import { gql } from "apollo-server-express"; //will create a schema

const Schema = gql`
  type Person {
    name: String!
    phone: String
    address: String!
    id: Int!
  }

  type Query {
    personCount: Int!
    allPersons(phone: String): [Person]!
    findPerson(name: String!): Person
    me: User
  }

  type User {
    username: String!
    password: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): Token
  }
`;

export default Schema;
//export this Schema so we can use it in our project
