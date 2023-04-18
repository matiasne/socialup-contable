import { gql } from "@apollo/client";

interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
}

interface QueryResult {
  cliente: Cliente;
}

const OBTENER_CLIENTE = gql`
  query ExampleQuery($findOneClientId: ID!) {
    findOneClient(id: $findOneClientId) {
      name
      email
      phone
    }
  }
`;

export const QueryClientService = {
  OBTENER_CLIENTE,
};
