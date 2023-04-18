import { gql } from "@apollo/client";

const AddBusiness = gql`


mutation AddBusiness($user: String!, $name: String!, $address: String, $category: String, $email: String, $image: String, $phone: String) {
    addBusiness(user: $user, name: $name, address: $address, category: $category, email: $email, image: $image, phone: $phone) {
      _id
    }
  }
  `;

export const BusinessMutationServices = {
    AddBusiness
  };