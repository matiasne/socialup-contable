import {
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { IProduct } from "../../models/product.interface";
import { ProductService } from "../../productsService/productsService";
import { useQuery } from "@apollo/client";

function ItemProduct(props: IProduct) {
  // const { loading, error, data } = useQuery(
  //   ProductService.ProductsQueryService.products,
  //   { variables: { findOneProductId: "643da4d87296b98e838979e6" } }
  // );

  return (
    <>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        primary={props.name}
        secondary={`Precio: ${props.name} Descripcion: ${props.name}`}
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
