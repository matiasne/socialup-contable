import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  FormControlLabel,
  Radio,
  RadioGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { UserServices } from "../../../shared/services/userServices/userServices";
import { ISale } from "../models/sale";
import { useMutation, useQuery } from "@apollo/client";
import NavBarMenu from "../../../shared/NavBar/NavBarMenu";
import { useForm } from "react-hook-form";
import { ClientServices } from "../../Clients/services/clientServices";
import { IClient } from "../../Clients/models/client";
import SimpleDialogDemo from "../../../shared/Components/modal/DialogsSelect";
import { useState } from "react";




export const FormSalesComponent = () => {
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false); // estado para controlar la apertura del diálogo de selección de cliente
  const [selectedClient, setSelectedClient] = useState(null); // estado para almacenar el cliente seleccionado
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ISale>();
  const [mutateFunction] = useMutation(
    UserServices.UserMutationServices.register
  );
  const { loading, error, data } = useQuery(ClientServices.QueryClientService.clients);
  
  const renderItem = (client: IClient) => {
    return <span>{client.name}</span>;
  };
  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values));
    mutateFunction({
      variables: {
        client: selectedClient, // utilizar el cliente seleccionado en lugar del TextField,
        product: values.item,
        total: values.total,
        variations: values.variations,
      },
    });
  });

  const handleOpenClientDialog = () => {
    setIsClientDialogOpen(true); // abrir el diálogo de selección de cliente
  };

  const handleCloseClientDialog = () => {
    setIsClientDialogOpen(false); // cerrar el diálogo de selección de cliente
  };

  const handleSelectClient = (client: any) => {
    setSelectedClient(client); // actualizar el cliente seleccionado
    handleCloseClientDialog(); // cerrar el diálogo de selección de cliente
  };

  return (
    <div>
      <NavBarMenu></NavBarMenu>
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "10vh",
        }}
        onSubmit={onSubmit}
      >
        <Card sx={{ p: 1 }}>
          <div>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              Venta
            </Typography>
            <Box>
            <SimpleDialogDemo></SimpleDialogDemo>
            </Box>
            <Box>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="Variación"
                sx={{ m: 1, width: "25ch" }}
                type="text"
                {...register("variations", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.variations?.type === "required" && {
                  helperText: "Campo obligatorio",
                  error: true,
                })}
                {...(errors.variations?.type === "minLength" && {
                  helperText: "El nombre es demasiado corto",
                  error: true,
                })}
              />
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="porsent"
                  control={<Radio />}
                  label="%"
                />
                <FormControlLabel value="male" control={<Radio />} label="$" />
              </RadioGroup>
            </Box>
            <Box>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                label="Total"
                sx={{ m: 1, width: "25ch" }}
                type="text"
                {...register("total", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.total?.type === "required" && {
                  helperText: "Campo obligatorio",
                  error: true,
                })}
                {...(errors.total?.type === "minLength" && {
                  helperText: "El nombre es demasiado corto",
                  error: true,
                })}
              />
            </Box>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ p: "3%" }}
            >
              <Button onClick={onSubmit} variant="contained">
                Terminar Venta
              </Button>
            </Grid>
          </div>
        </Card>
        <Dialog open={isClientDialogOpen} onClose={handleCloseClientDialog}>
          <DialogTitle>Seleccionar Cliente</DialogTitle>
          <DialogContent>{<ListClient />}</DialogContent>
          <DialogActions>
            <Button onClick={handleCloseClientDialog}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};
