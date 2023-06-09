import { Delete, Edit } from "@mui/icons-material";
import React, {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { IBusiness } from "../../models/business";
import { useQuery } from "@apollo/client";
import { BusinessServices } from "../../services/businessServices";

function ItemBusiness(props: IBusiness) {

  return (
    <>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        primary={props.name}
        secondary={`email: ${props.Mail},phone: ${props.Phone}, address: ${props.Address}`}
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
export default ItemBusiness;
