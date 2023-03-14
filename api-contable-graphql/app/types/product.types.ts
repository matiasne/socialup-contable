import { gql } from "apollo-server-express";

module.exports = gql`
  type Product {
    name: String!
    description: String
    codigo: String
    costPrice: String
    salePrice: String
    image: String
  }

  type Query {
    product: Product
  }

  type Mutation {
    createProduct(
      name: String!
      description: String
      codigo: String
      costPrice: String
      salePrice: String
      image: String
    ): Product
  }
`;
