import { gql } from "apollo-server-express";

module.exports = gql`
  type Movement {
    typeMovement: String
    idBusiness: Business!
    actualBusiness: [String]
    client: Client
    actualClient: [String]
    productsIds: [String]
    box: Box!
    total: Float!
    payments: [String]
    variations: [String]
    billingDate: String
    status: String
    id: ID!
  }

  type Query {
    findMovement: [Movement]
    findOneMovement(id: ID!): Movement
  }

  type Mutation {
    addMovement(
      typeMovement: String!
      idbusiness: [String]
      client: String
      productsIds: [String]
      box: ID
      total: Float
      payments: [String]
      variations: [String]
      billingDate: String
      status: String
    ): String
    updateMovement(
      _id: String!
      typeMovement: String
      business: String
      client: String
      product: [String]
      total: Float
      payments: [String]
      variations: [String]
      billingDate: String
      status: String
    ): String
    deleteMovement(_id: String!): String
  }
`;
