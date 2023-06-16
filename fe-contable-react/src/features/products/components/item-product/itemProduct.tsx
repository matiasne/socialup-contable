import { MouseEventHandler, useState } from "react";
import {
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  ListItemText,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { IProduct } from "../../models/product.interface";
import DeleteDialog from "../../../../shared/Components/dialog/deleteDialog";

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

export default ItemProduct;
