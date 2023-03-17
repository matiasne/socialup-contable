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
  }

  type Mutation {
    addPerson(name: String!, phone: String, street: String!, city: String!): Person
  }
`;

export default Schema;
//export this Schema so we can use it in our project
