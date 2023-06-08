import { gql } from "@apollo/client";

const CreateBox = gql`
  mutation CreateBox(
    $business: String!
    $name: String!
    $status: String
    $actualAmount: Float
    $image: String
    $dailyAmount: Float
  ) {
    createBox(
      business: $business
      name: $name
      status: $status
      actualAmount: $actualAmount
      image: $image
      dailyAmount: $dailyAmount
    ) {
      id
    }
  }
`;

const UpdateBox = gql`
  mutation UpdateBox(
    $business: String!
    $name: String!
    $status: String
    $actualAmount: Float
    $image: String
    $dailyAmount: Float
  ) {
    updateBox(
      business: $business
      name: $name
      status: $status
      actualAmount: $actualAmount
      image: $image
      dailyAmount: $dailyAmount
    ) {
      id
    }
  }
`;

const DeleteBox = gql`
  mutation Mutation($id: String!) {
    deleteBox(_id: $id)
  }
`;

export const BoxMutationServices = {
  CreateBox,
  DeleteBox,
  UpdateBox
};
