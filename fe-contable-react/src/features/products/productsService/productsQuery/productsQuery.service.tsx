import { gql } from "@apollo/client";

const products = gql`
  query FindProduct {
    findUserBusiness  {
      products {
      id
      name
      description
      salePrice
      }
    }
  }
`;

export const ProductsQueryService = {
  products,
};
