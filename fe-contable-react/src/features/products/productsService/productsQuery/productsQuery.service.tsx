import { gql } from "@apollo/client";

const products = gql`
  query FindProduct {
    findProduct {
      id
      name
      description
      salePrice
      costPrice
      image
    }
  }
`;

export const ProductsQueryService = {
  products,
};
