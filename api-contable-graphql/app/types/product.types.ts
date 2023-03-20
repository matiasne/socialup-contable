import { gql } from "apollo-server-express";

module.exports = gql`
  type Product {
    busines: Business
    name: String!
    description: String
    codigo: String
    costPrice: String
    salePrice: String
    image: String
    id: ID!
  }

  type Query {
    findProduct: [Product]
    findOneProduct(id: ID!): Product
  }

  type Mutation {
    createProduct(
      business: String!
      name: String!
      description: String
      codigo: String
      costPrice: String
      salePrice: String
      image: String
    ): Product
  }
`;
