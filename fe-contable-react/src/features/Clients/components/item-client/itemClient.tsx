import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { IClient } from "../../models/client";
import { MouseEventHandler, useState } from "react";
import DeleteDialog from "../../../../shared/Components/dialog/deleteDialog";
import { useMutation, useQuery } from "@apollo/client";
import { ClientServices } from "../../services/clientServices";
import FormClient from "../form-client/formClient";
import { useToast } from "../../../../shared/Components/toast/ToastProvider";

type Props = {
  client: IClient;
};

function ItemClient(props: Props) {
  const { data, error, loading, refetch } = useQuery(
    ClientServices.QueryClientService.clients
  );
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [DeleteClient] = useMutation(
    ClientServices.ClientMutationServices.DeleteClient
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
    console.log(props);
    await DeleteClient({ variables: { id: props.client.id } });
    toastShow({
      message: "El cliente ha sido eliminado correctamente",
      severity: "success",
      duration: 5000,
    });
    refetch();
  };

  const handleCloseEditDialog = async () => {
    setIsEditDialogOpen(false);
  };

  return (
    <>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <>
        <ListItemText
          primary={props.client.name}
          secondary={`email: ${props.client.email}, phone: ${props.client.phone}`}
        />
        <IconButton edge="end" aria-label="editar" onClick={() => handleEdit()}>
          <Edit />
        </IconButton>
        <IconButton edge="end" aria-label="eliminar" onClick={handleDelete}>
          <Delete />
        </IconButton>
      </>
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
          <FormClient client={props.client} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default ItemClient;
