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

const UpdateClient = gql`
  mutation UpdateClient($id: String!, $name: String!, $email: String!) {
    updateClient(_id: $id, name: $name, email: $email) {
      address
      name
      image
      city
      email
      phone
      postCode
      documentType
      documentNumber
      surname
      _id
    }
  }
`;

const DeleteClient = gql`
  mutation UpdateClient($id: String!) {
    deleteClient(_id: $id)
  }
`;

export const ClientMutationServices = {
  createClient,
  UpdateClient,
  DeleteClient,
};
