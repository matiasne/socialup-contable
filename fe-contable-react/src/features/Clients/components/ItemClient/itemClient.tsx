import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { IClient } from "../../models/client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ClientServices } from "../../services/clientServices";
import { Navigate, redirect } from "react-router-dom";
import FormClient from "../FormClient/formClient";

function ItemClient(props: IClient) {
  const [clients, setClients] = useState<IClient[]>([props]);
  const { loading, error, data } = useQuery(
    ClientServices.QueryClientService.OBTENER_CLIENTES
  );
  function handleEdit() {
    console.log("Editar cliente:", props.id);
    console.log(`/Clients/${props.id}`);
    return props.id ? redirect(`/Clients/${props.id}`) : <></>;
  }
  function handleDelete(): void {}
  return (
    <>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        primary={props.name}
        secondary={`email: ${props.email},
        teléfono: ${props.phone},
        numeroDocumento: ${props.documentNumber},
        tipoDocumento: ${props.documentType},
        direccion: ${props.address},
        ciudad: ${props.city},
        codigoPostal: ${props.postCode}
        idNegocio: ${props.idBusinnes} `}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="editar" onClick={handleEdit}>
          <Edit />
        </IconButton>
        <IconButton edge="end" aria-label="eliminar">
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </>
  );
}

export default ItemClient;
