import { Delete, Edit } from "@mui/icons-material";
import React, {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { IClient } from "../../models/client";
import {
  ApolloError,
  QueryResult,
  useMutation,
  useQuery,
} from "@apollo/client";
import { ClientServices } from "../../services/clientServices";

function ItemClient(props: IClient) {
  const { loading, error, data } = useQuery(
    ClientServices.QueryClientService.OBTENER_CLIENTE,
    { variables: { findOneClientId: "643d9843359d19fa42bb5b76" } }
  );
  console.log(data);
  if (data.findOneClient) {
    return (
      <>
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText
          primary={data.findOneClient.name}
          secondary={`email: ${data.findOneClient.email}, phone: ${data.findOneClient.phone}`}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="editar">
            <Edit />
          </IconButton>
          <IconButton edge="end" aria-label="eliminar">
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </>
    );
  }
}
export default ItemClient;
