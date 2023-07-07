import { gql } from "@apollo/client";

const Boxs = gql`
  query Box {
    findUserBusiness {
      box {
        name
        actualAmount
        dailyAmount
      }
    }
  }
`;

const FindOnebox = gql`
  query FindOneBox($findOneBoxId: ID!) {
    findOneBox(id: $findOneBoxId) {
      name
      status
      actualAmount
      image
      dailyAmount
    }
  }
`;

export const BoxQueryServices = {
  Boxs,
  FindOnebox,
};
