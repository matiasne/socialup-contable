import { useMutation, useQuery } from "@apollo/client";
import { ProductService } from "../../productsService/productsService";
import { MouseEventHandler, useEffect, useState } from "react";
import {
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  Alert,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { IProduct } from "../../models/product.interface";

function ItemProduct(props: IProduct) {
  console.log(props);
  const [isEditing] = useState(false);
  const { refetch } = useQuery(ProductService.ProductsQueryService.products);
  const [MutationFunction] = useMutation(
    ProductService.ProductMutationServices.DeleteProduct
  );
  const { error, data, loading } = useQuery(
    ProductService.ProductsQueryService.products
  );

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed: MouseEventHandler<HTMLButtonElement> = () => {
    MutationFunction({ variables: { id: props.id } })
      .then(() => {
        refetch();
        setIsDeleteDialogOpen(false);
        // alert(<Alert severity="success">Se elimino correctamente</Alert>);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      {isEditing ? (
        <></>
      ) : (
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
      )}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>
          ¿Está seguro que desea eliminar este producto?
        </DialogTitle>
        <DialogContent></DialogContent>
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
