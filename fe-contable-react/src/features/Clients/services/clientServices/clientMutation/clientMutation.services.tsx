import { gql } from "@apollo/client";

const createClient = gql`
  mutation CreateClient(
    $business: String!
    $name: String!
    $image: String
    $city: String
    $address: String
    $email: String!
    $phone: String
    $postCode: String
    $documentType: String
    $documentNumber: String
    $surname: String
  ) {
    createClient(
      business: $business
      name: $name
      image: $image
      city: $city
      address: $address
      email: $email
      phone: $phone
      postCode: $postCode
      documentType: $documentType
      documentNumber: $documentNumber
      surname: $surname
    ) {
      id
    }
  }
`;
export const UpdateClient = gql`
  mutation UpdateClient(
    $id: String!
    $name: String
    $address: String
    $category: String
    $email: String
    $image: String
    $phone: String
  ) {
    updateClient(
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
export const DeleteClient = gql`
  mutation DeleteClient($id: String!) {
    deleteClient(_id: $id)
  }
`;

export const ClientMutationServices = {
  createClient,
  UpdateClient,
  DeleteClient,
};
