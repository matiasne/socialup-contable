import { gql } from "@apollo/client";

const Accountbox = gql`
query FindBox {
  findBox {
    name
    status
    actualAmount
    image
    dailyAmount
    id
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
    Accountbox,
    FindOnebox,
};
