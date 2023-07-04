import { gql } from "@apollo/client";

const AddBusiness = gql`
  mutation AddBusiness(
    $name: String!
    $address: String
    $category: String
    $email: String
    $image: String
    $phone: String
  ) {
    addBusiness(
      name: $name
      address: $address
      category: $category
      email: $email
      image: $image
      phone: $phone
    ) {
      _id
    }
  }
`;

const DeleteBusiness = gql`
  mutation DeleteBusiness($id: String!) {
    deleteBusiness(_id: $id)
  }
`;

const UpdateBusiness = gql`
  mutation UpdateBusiness(
    $id: String!
    $name: String
    $address: String
    $category: String
    $email: String
    $image: String
    $phone: String
  ) {
    updateBusiness(
      _id: $id
      name: $name
      address: $address
      category: $category
      email: $email
      image: $image
      phone: $phone
    ) {
      _id
    }
  }
`;

export const BusinessMutationServices = {
  AddBusiness,
  DeleteBusiness,
  UpdateBusiness,
};
