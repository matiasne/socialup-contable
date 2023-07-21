import { Delete, Edit } from "@mui/icons-material";
import React, {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { IBusiness } from "../../models/business";
import { BusinessServices } from "../../services/businessServices";
import { useMutation, useQuery } from "@apollo/client";
import { MouseEventHandler, useState } from "react";
import { useToast } from "../../../../shared/Components/toast/ToastProvider";
import DeleteDialog from "../../../../shared/Components/dialog/deleteDialog";
import FormBusinessComponent from "../form-business/form-business";

type Props = {
  business: IBusiness;
  buttonAction?: boolean;
};

function ItemBusiness(props: Props) {
  const { data, error, loading, refetch } = useQuery(
    BusinessServices.BusinessQueryServices.FindBusiness
  );
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [DeleteBusiness] = useMutation(
    BusinessServices.BusinessMutationServices.DeleteBusiness
  );
  refetch();
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
    console.log(props);
    await DeleteBusiness({ variables: { id: props.business } });
    toastShow({
      message: "La empresa se ha sido eliminado correctamente",
      severity: "success",
      duration: 5000,
    });
    refetch();
  };

  const handleCloseEditDialog = async () => {
    console.log(props);
    setIsEditDialogOpen(false);
  };

  return (
    <>
      {" "}
      <>
        <ListItemAvatar>
          <Avatar src={props.business.Image} alt={props.business.name} />
        </ListItemAvatar>
        <ListItemText
          primary={props.business.name}
          secondary={`email: ${props.business.email},phone: ${props.business.phone}, address: ${props.business.address}`}
        />
        {props.buttonAction == true ? (
          <>
            {" "}
            <IconButton
              edge="end"
              aria-label="editar"
              onClick={() => handleEdit()}
            >
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="eliminar" onClick={handleDelete}>
              <Delete />
            </IconButton>
          </>
        ) : null}
      </>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirmed}
        title="¿Está seguro que desea eliminar esta empresa?"
        message="Se eliminará de forma permanente "
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogContent>
          <FormBusinessComponent
            business={props.business}
            onClose={() => {
              setIsEditDialogOpen(false);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default ItemBusiness;
