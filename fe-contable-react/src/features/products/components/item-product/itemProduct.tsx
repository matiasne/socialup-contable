import { MouseEventHandler, useState } from "react";
import {
  IconButton,
  ListItemText,
  CardContent,
  Card,
  CardActions,
  CardMedia,
  CardActionArea,
  Dialog,
  DialogContent,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { IProduct } from "../../models/product.interface";
import DeleteDialog from "../../../../shared/Components/dialog/deleteDialog";
import { useMutation, useQuery } from "@apollo/client";
import { ProductService } from "../../productsService/productsService";
import { useToast } from "../../../../shared/Components/toast/ToastProvider";
import FormProductComponent from "../form-product/formProduct";

type Props = { products: IProduct };

const ItemProduct = (props: Props) => {
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
      message: "El producto ha sido eliminado correctamente",
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
    <div style={{ padding: "8px", display: "inline-block" }}>
      <Card
        sx={{
          maxWidth: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "300px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={props.products.image}
              alt="Product"
              style={{
                objectFit: "cover",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            />
          </CardActionArea>
        </Card>
        <Card>
          <CardContent>
            <ListItemText
              primaryTypographyProps={{
                variant: "h6",
                fontWeight: "bold",
                textAlign: "center",
              }}
              primary={props.products.name}
            />
            <ListItemText
              secondaryTypographyProps={{ textAlign: "left" }}
              secondary={`Precio: ${props.products.salePrice}`}
            />
            <ListItemText
              secondaryTypographyProps={{ textAlign: "left" }}
              secondary={`Descripcion: ${props.products.description}`}
            />
          </CardContent>
        </Card>
        <Card>
          <CardActions sx={{ flexDirection: "row-reverse" }}>
            <IconButton
              aria-label="eliminar"
              onClick={handleDelete}
              size="medium"
            >
              <Delete />
            </IconButton>
            <IconButton aria-label="editar" size="medium" onClick={handleEdit}>
              <Edit />
            </IconButton>
          </CardActions>
        </Card>
      </Card>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirmed}
        title="¿Está seguro que desea eliminar este producto?"
        message="Se eliminará de forma permanente"
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
      </Dialog>
    </div>
  );
};

export default ItemProduct;
