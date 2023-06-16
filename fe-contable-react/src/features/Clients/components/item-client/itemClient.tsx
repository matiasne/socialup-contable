import { Delete, Edit, Refresh } from "@mui/icons-material";
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
import FormClient from "../form-client/formClient";

function ItemClient(
  props: IClient & { setShouldRefetch: (value: boolean) => void }
) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDeleteDialogOpen(false);
    props.setShouldRefetch(true);
  };

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [clientData, setClientData] = useState(null);

  const handleEdit = (client: any) => {
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
          <IconButton edge="end" aria-label="editar" onClick={handleEdit}>
            <Edit />
          </IconButton>
          <IconButton edge="end" aria-label="eliminar" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>¿Está seguro que desea eliminar este cliente?</DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirmed}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      >
        <DialogTitle>Editar Cliente</DialogTitle>
        <DialogContent>
          <FormClient />
        </DialogContent>
      </Dialog>
    </>
  );
}
export default ItemClient;
