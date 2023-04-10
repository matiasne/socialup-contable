import {
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { IProduct } from "../../models/product.interface";

function ItemProduct(props: IProduct) {
  return (
    <>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        primary={props.name}
        secondary={`Precio: ${props.salePrice}`}
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

export default ItemProduct;
