import { MouseEventHandler, useState } from "react";
import {
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { IProduct } from "../../models/product.interface";

function ItemProduct(props: IProduct) {
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
          secondary={`Precio: ${props.salePrice} Descripcion: ${props.description}`}
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
        <DialogTitle>
          ¿Está seguro que desea eliminar este producto?
        </DialogTitle>
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

export default ItemProduct;
