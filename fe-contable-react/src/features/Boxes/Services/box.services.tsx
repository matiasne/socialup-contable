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

const ImageBox = gql`
  mutation AddBoxPhoto($addBoxPhotoId: String!, $file: File!) {
    addBoxPhoto(id: $addBoxPhotoId, file: $file)
  }
`;

export const BoxMutationServices = {
  CreateBox,
  ImageBox,
};
