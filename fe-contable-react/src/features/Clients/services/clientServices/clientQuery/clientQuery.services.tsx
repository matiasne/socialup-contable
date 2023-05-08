import { gql } from "@apollo/client";

const OBTENER_CLIENTES = gql`
  query Query {
    findClient {
      address
      city
      email
      id
      name
      phone
      surname
    }
  }
`;
const OBTENER_CLIENTE = gql`
  query FindOneClient($findOneClientId: ID!) {
    findOneClient(id: $findOneClientId) {
      name
      city
      address
      email
      phone
      surname
      id
      postCode
      documentNumber
      documentType
    }
  }
`;

export const QueryClientService = {
  OBTENER_CLIENTES,
  OBTENER_CLIENTE,
};
