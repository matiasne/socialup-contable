import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Grid,
  InputAdornment,
  styled,
  Switch,
  SwitchProps,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import NavBarMenu from "../../../shared/NavBar/NavBarMenu";
import { UserServices } from "../../../shared/services/userServices/userServices";
import { IBox } from "../models/box";
import { BoxMutationServices } from "../Services/box.services";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#FA0404" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export const FormBoxComponent = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IBox>();
  const [mutateFunction, { loading, error, data }] = useMutation(
    BoxMutationServices.CreateBox
  );
console.log(data)
  const onSubmit = handleSubmit((values) => {

    alert(JSON.stringify(values));
    mutateFunction({
      variables: {
        idBusiness: values.idBusiness,
        image: values.Image,
        name: values.Name,
        status: values.Status,
        actualAmount: values.ActualAmount,
        dailyAmount: values.DailyAmount,
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
            <Box>
              <Typography variant="h3" sx={{ textAlign: "center" }}>
                Crear Caja
              </Typography>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="Name"
                sx={{ m: 1, width: "25ch" }}
                type="text"
                {...register("Name", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.Name?.type === "required" && {
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.Name?.type === "minLength" && {
                  helperText: "El nombre es demaciado corto",
                  error: true,
                })}
              />
            </Box>
            <Box>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                label="Monto Inicial"
                type="number"
                {...register("ActualAmount", {
                  required: true,
                  minLength: 2,
                })}
                {...(errors.ActualAmount?.type === "required" && {
                  helperText: "Campo Obligatorio",
                  error: true,
                })}
                {...(errors.ActualAmount?.type === "minLength" && {
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
                Submit
              </Button>
            </Grid>
            <Grid container justifyContent="center" alignItems="center">
              <FormControlLabel
                control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                label="Open"
              />
            </Grid>
          </div>
        </Card>
      </Box>
    </div>
  );
};
