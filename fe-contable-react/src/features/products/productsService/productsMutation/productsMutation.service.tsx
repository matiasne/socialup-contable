import { gql } from "@apollo/client";

const AddProduct = gql`
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

const UpdateProduct = gql`
  mutation UpdateProduct(
    $name: String
    $description: String
    $codigo: String
    $costPrice: String
    $salePrice: String
    $image: String
  ) {
    updateProduct(
      name: $name
      description: $description
      codigo: $codigo
      costPrice: $costPrice
      salePrice: $salePrice
      image: $image
    ) {
      codigo
      costPrice
      description
      image
      name
      salePrice
    }
  }
`;

const DeleteProducts = gql`
  mutation UpdateProduct($id: String!) {
    deleteProduct(_id: $id)
  }
`;

export const ProductMutationServices = {
  AddProduct,
  UpdateProduct,
  DeleteProducts,
};
