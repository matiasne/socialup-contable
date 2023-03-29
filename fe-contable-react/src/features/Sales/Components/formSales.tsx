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
import { useForm } from "react-hook-form";
import { UserServices } from "../../../shared/services/userServices/userServices";
import { ISale } from "../models/sale";
import { useMutation } from "@apollo/client";
import NavBarMenu from "../../../shared/NavBar/NavBarMenu";
import ConfirmationDialog from "../../../shared/Components/modal/ConfitmationDialog";

export const FormSalesComponent = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ISale>();
  const [mutateFunction, { loading, error, data }] = useMutation(
    UserServices.UserMutationServices.register
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
        <Card sx={{ p: 1 }}>
          <div>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              Venta
            </Typography>
            <Box>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="Cleinte"
                sx={{ m: 1, width: "25ch" }}
                type="text"
                {...register("client", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.client?.type === "required" && {
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.client?.type === "minLength" && {
                  helperText: "El nombre es demaciado corto",
                  error: true,
                })}
              />
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
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.variations?.type === "minLength" && {
                  helperText: "El nombre es demaciado corto",
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
            <Box></Box>
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
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.total?.type === "minLength" && {
                  helperText: "El nombre es demaciado corto",
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
            <Box></Box>
          </div>
        </Card>
      </Box>
    </div>
  );
};
