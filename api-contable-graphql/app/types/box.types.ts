import { gql } from "apollo-server-express";

module.exports = gql`
  type Box {
    business: Business
    name: String!
    status: String
    actualAmount: Float
    image: String
    dailyAmount: Float
    id: ID!
  }

  type Query {
    findBox: [Box]
    findOneBox(id: ID!): Box
  }

  type Mutation {
    createBox(
      business: String!
      name: String!
      status: String
      actualAmount: Float
      image: String
      dailyAmount: Float
    ): Box
    updateBox(
      _id: String!
      business: String
      name: String!
      status: String
      actualAmount: Float
      image: String
      dailyAmount: Float
    ): Box
    deleteBox(_id: String!): String
  }
`;
