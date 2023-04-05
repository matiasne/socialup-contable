import {
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  ListItem,
  List,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { ISale } from "../models/sale";

function ItemSale(props: ISale) {
  return (
    <>
      <List>
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText primary={props.client} />
        <ListItem>
          <ListItemText primary={`Cantidad de productos: ${props.item}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Total de compra: ${props.total}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Forma de pago: ${props.payments}`} />
        </ListItem>
      </List>
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

export default ItemSale;
