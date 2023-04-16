import { gql } from "@apollo/client";

const create = gql`
  mutation CreateProduct(
    $business: String!
    $name: String!
    $description: String
    $codigo: String
    $costPrice: String
    $salePrice: String
    $image: String
  ) {
    createProduct(
      business: $business
      name: $name
      description: $description
      codigo: $codigo
      costPrice: $costPrice
      salePrice: $salePrice
      image: $image
    ) {
      id
    }
  }
`;
export const ProductMutationServices = {
  create,
};
