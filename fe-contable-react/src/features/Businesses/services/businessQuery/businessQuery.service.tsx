import { gql } from "@apollo/client";

const AccountBusiness = gql`
  query FindBusiness {
    findBusiness {
      name
      address
      category
      email
      image
      phone
      _id
    }
  }
`;

const FindOneBusiness = gql`
  query FindOneBusiness($findOneBusinessId: ID!) {
    findOneBusiness(id: $findOneBusinessId) {
      name
      address
      category
      email
      image
      phone
      _id
    }
  }
`;

const FindOneUser = gql`
  query FindOneUser($findOneUserId: ID!) {
    findOneUser(id: $findOneUserId) {
      business {
        name
        address
        category
        email
        image
        phone
        _id
      }
    }
  }
`;

export const BusinessQueryServices = {
  AccountBusiness,
  FindOneBusiness,
  FindOneUser,
};
