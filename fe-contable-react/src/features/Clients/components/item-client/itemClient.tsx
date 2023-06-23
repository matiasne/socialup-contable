import { Delete, Edit, Refresh, RefreshOutlined } from "@mui/icons-material";
import React, {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { IClient } from "../../models/client";
import { MouseEventHandler, useState } from "react";
import DeleteDialog from "../../../../shared/Components/dialog/deleteDialog";
import { useQuery } from "@apollo/client";
import { ClientServices } from "../../services/clientServices";

function ItemClient(props: IClient) {
  const { data, error, loading, refetch } = useQuery(
    ClientServices.QueryClientService.clients
  );
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [clientData, setClientData] = useState<IClient>();

  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDeleteDialogOpen(false);
    setShowAlert(true);
    setTimeout(() => {
      refetch();
    }, 1000);
  };

  const handleEdit = (client: IClient) => {
    setIsEditDialogOpen(true);
    setClientData(client);
  };

  return (
    <>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <>
        <ListItemText
          primary={props.name}
          secondary={`email: ${props.email}, phone: ${props.phone}`}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="editar"
            onClick={() => handleEdit(props)}
          >
            <Edit />
          </IconButton>
          <IconButton edge="end" aria-label="eliminar" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirmed}
        title="¿Está seguro que desea eliminar este producto?"
        message="Se eliminara de forma permanente "
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </>
  );
}
export default ItemClient;
