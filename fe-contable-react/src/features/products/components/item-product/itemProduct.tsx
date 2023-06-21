import { MouseEventHandler, useState } from "react";
import {
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  ListItemText,
  CardContent,
  Typography,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Box,
  CardActionArea,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { IProduct } from "../../models/product.interface";
import DeleteDialog from "../../../../shared/Components/dialog/deleteDialog";
import { useQuery } from "@apollo/client";
import { ProductService } from "../../productsService/productsService";
import { useToast } from "../../../../shared/Components/toast/ToastProvider";

function ItemProduct(props: IProduct) {
  const { data, error, loading, refetch } = useQuery(
    ProductService.ProductsQueryService.products
  );
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDeleteDialogOpen(true);
  };

  const { toastShow } = useToast();

  const handleDeleteConfirmed: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDeleteDialogOpen(false);
    setShowAlert(true);
    toastShow({
      message: "El poducto ha sido eliminado correctamente",
      severity: "success",
    });
    setTimeout(() => {
      refetch();
    }, 20);
  };
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image="" alt="Product" />
      </CardActionArea>
      <CardContent>
        <ListItemText primary={props.name} />
        <ListItemText secondary={`Precio: ${props.salePrice}`} />{" "}
        <ListItemText secondary={`Descripcion: ${props.description}`} />
      </CardContent>
      <CardActions>
        <IconButton edge="end" aria-label="editar" size="medium">
          <Edit />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="eliminar"
          onClick={handleDelete}
          size="medium"
        >
          <Delete />
        </IconButton>{" "}
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
      </CardActions>
    </Card>
  );
}

export default ItemProduct;
