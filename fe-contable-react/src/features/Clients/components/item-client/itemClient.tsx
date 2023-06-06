import { Delete, Edit } from "@mui/icons-material";
import React, {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { IClient } from "../../models/client";
import { MouseEventHandler, useState } from "react";

function ItemClient(props: IClient) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDeleteDialogOpen(false);
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
          <IconButton edge="end" aria-label="editar">
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
    </>
  );
}
export default ItemClient;
