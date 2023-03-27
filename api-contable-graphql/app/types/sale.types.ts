import { gql } from "apollo-server-express";



module.exports = gql`
  type Sale {
    business: Business
    client: Client
    product: [Product]
    total: Float
    payments: [String]
    variations: [String]
    billingDate: String
    status: [String]
    id: ID!
  }

  type Query {
    findSale: [Sale]
    findOneSale(id: ID!): Sale
  }

  type Mutation {
    addSale(
      business: String
      client: String
      product: [String]
      total: Float
      payments: [String]
      variations: [String]
      billingDate: String
      status: [String]
    ): Sale
    updateSale(
      _id: String!
      business: String
      client: String
      product: [String]
      total: Float
      payments: [String]
      variations: [String]
      billingDate: String
      status: [String]
    ): String
    deleteString(_id: String!): String
  }
`;
