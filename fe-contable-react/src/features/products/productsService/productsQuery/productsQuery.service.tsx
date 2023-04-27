import { gql } from "@apollo/client";

const products = gql`
  query FindProduct {
    findProduct {
      id
      name
    }
  }
`;

export const ProductsQueryService = {
  products,
};
