import { gql } from "@apollo/client";

const products = gql`
  query FindProduct {
    findProduct {
      id
      name
      description
      salePrice
    }
  }
`;

export const ProductsQueryService = {
  products,
};
