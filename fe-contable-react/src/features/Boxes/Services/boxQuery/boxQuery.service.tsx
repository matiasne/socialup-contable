import { gql } from "@apollo/client";

const Boxs = gql`
query FindBoxes {
  findUserBusiness {
    box {
      name
      id
      status
      actualAmount
    }
}
}`;

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
