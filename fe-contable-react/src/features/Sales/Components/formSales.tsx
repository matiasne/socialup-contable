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
} from "@mui/material";
import { UserServices } from "../../../shared/services/userServices/userServices";
import { ISale } from "../models/sale";
import { useMutation, useQuery } from "@apollo/client";
import NavBarMenu from "../../../shared/NavBar/NavBarMenu";
import { useForm } from "react-hook-form";
import { ClientServices } from "../../Clients/services/clientServices";
import SimpleDialogDemo from "../../../shared/Components/modal/DialogsSelect";

export const FormSalesComponent = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ISale>();
  const [mutateFunction] = useMutation(
    UserServices.UserMutationServices.register
  );
  const { loading, error, data } = useQuery(
    ClientServices.QueryClientService.clients
  );

  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values));
    mutateFunction({
      variables: {
        client: values.client,
        product: values.item,
        total: values.total,
        variations: values.variations,
      },
    });
  });

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
        <Card sx={{ p: 1, minWidth: "20em", textAlign: "center" }}>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Venta
          </Typography>
          <SimpleDialogDemo></SimpleDialogDemo>
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
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="porsent" control={<Radio />} label="%" />
              <FormControlLabel value="male" control={<Radio />} label="$" />
            </RadioGroup>
          </Box>
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
        </Card>
      </Box>
    </div>
  );
};
