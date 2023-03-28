import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

function ListaProductos(props: { productos: any }) {
  const productos = props.productos;
  const listaProductos = productos.map((producto: any) => (
    <ListItem key={producto.nombre}>
      <ListItemAvatar>
        <Avatar alt={producto.nombre} src={producto.imagen} />
      </ListItemAvatar>
      <ListItemText
        primary={producto.nombre}
        secondary={`Precio: ${producto.precio}`}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="editar">
          <Edit />
        </IconButton>
        <IconButton edge="end" aria-label="eliminar">
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));
  return <List>{listaProductos}</List>;
}

export default ListaProductos;
