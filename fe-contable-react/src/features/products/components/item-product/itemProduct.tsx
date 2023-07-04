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
  DialogContent,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { IProduct } from "../../models/product.interface";
import DeleteDialog from "../../../../shared/Components/dialog/deleteDialog";
import { useMutation, useQuery } from "@apollo/client";
import { ProductService } from "../../productsService/productsService";
import { useToast } from "../../../../shared/Components/toast/ToastProvider";
import FormClient from "../../../Clients/components/form-client/formClient";
import FormProductComponent from "../form-product/formProduct";

type Props = { products: IProduct };

function ItemProduct(props: Props) {
  const { data, error, loading, refetch } = useQuery(
    ProductService.ProductsQueryService.products
  );
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [MutateFuncioDelete] = useMutation(
    ProductService.ProductMutationServices.DeleteProducts
  );
  const [MutateFuncioUpdate] = useMutation(
    ProductService.ProductMutationServices.UpdateProduct
  );

  const handleEdit = async () => {
    setIsEditDialogOpen(true);
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDeleteDialogOpen(true);
  };

  const { toastShow } = useToast();

  const handleDeleteConfirmed: MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    setIsDeleteDialogOpen(false);
    setShowAlert(true);
    await MutateFuncioDelete({ variables: { id: props.products.id } });
    toastShow({
      message: "El poducto ha sido eliminado correctamente",
      severity: "success",
      duration: 5000,
    });
    refetch();
  };
  const handleCloseEditDialog = async () => {
    setIsEditDialogOpen(false);
    await MutateFuncioUpdate({ variables: { Props: props.products.id } });
    // toastShow({
    //   message: "El producto ha sido actualizado correctamente",
    //   severity: "success",
    //   duration: 5000,
    // });
  };
  return (
    <>
      <Card sx={{ maxWidth: 400 }}>
        <CardActionArea>
          <CardMedia component="img" height="140" image="" alt="Product" />
        </CardActionArea>
        <CardContent>
          <ListItemText primary={props.products.name} />
          <ListItemText
            secondary={`Precio: ${props.products.salePrice}`}
          />{" "}
          <ListItemText
            secondary={`Descripcion: ${props.products.description}`}
          />
        </CardContent>
        <CardActions>
          <IconButton aria-label="editar" size="medium" onClick={handleEdit}>
            <Edit />
          </IconButton>
          <IconButton
            aria-label="eliminar"
            onClick={handleDelete}
            size="medium"
          >
            <Delete />
          </IconButton>{" "}
        </CardActions>
      </Card>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirmed}
        title="¿Está seguro que desea eliminar este producto?"
        message="Se eliminara de forma permanente "
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogContent>
          <FormProductComponent
            products={props.products}
            onAdd={handleCloseEditDialog}
            onEdit={handleCloseEditDialog}
          />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleCloseEditDialog}>Guardar</Button>
        </DialogActions>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
}

export default ItemProduct;
