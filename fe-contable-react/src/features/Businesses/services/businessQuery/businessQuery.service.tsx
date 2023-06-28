import { gql } from "@apollo/client";

const FindBusiness = gql`
  query FindBusiness  {
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

const FindUserBusiness = gql`
query FindUserBusiness($findUserBusinessId: ID, $pageCount: Int, $perPage: Int, $searchWord: String) {
  findUserBusiness(id: $findUserBusinessId, pageCount: $pageCount, perPage: $perPage,searchWord: $searchWord) {
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
  FindBusiness,
  FindUserBusiness,
  FindOneUser,
};
